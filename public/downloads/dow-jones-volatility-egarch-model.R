# Dow Jones volatility, geopolitical risk, inflation and Fed rates
# ARMA(2,2)-EGARCH(1,1) with exogenous variables, daily DJIA 2004-2023
# Data: Dow Jones Volatility - Dataset.xlsx (place it in the working directory)

# ARCH/eGARCH MODELS
rm(list = ls())

#install.packages("pacman")
library(pacman)
p_load(readxl, FinTS, forecast, rugarch, urca, xts, dplyr, zoo, lubridate)

# IMPORT DATA
dowjones = read_excel('Dow Jones Volatility - Dataset.xlsx')
dowjones$Date <- as.Date(dowjones$Date)

# Tạo chuỗi thời gian từ cột Price
dowjones.series <- xts(dowjones$Price, order.by = dowjones$Date)

# Tính tỷ suất lợi nhuận logarit
logdj <- diff(log(dowjones.series))
logdj <- na.omit(logdj)

# Kiểm tra tỷ suất lợi nhuận
summary(logdj)
plot(logdj, main = "Dow Jones return", ylab = "")

# ACF và PACF
par(mfrow = c(2,1))
layout(matrix(c(1, 1, 2, 3), 2,2, byrow=TRUE))
plot(logdj, main = "Dow Jones return rate", ylab = "Daily return")
Acf(logdj, main = 'Autocorrelations', ylab = '', lag.max = 25)
Pacf(logdj, main = 'Partial Autocorrelations', ylab = '')
par(mfrow = c(1,1))

# Kiểm tra ARCH effect
ArchTest(coredata(logdj), lags = 12)

# ARMA model
# Khởi tạo khung lưu kết quả
results <- data.frame(p = integer(), q = integer(), AIC = numeric(), BIC = numeric())

# Lặp qua tất cả các tổ hợp p và q từ 0 đến 2
for (p in 0:2) {
  for (q in 0:2) {
    try({
      fit <- arima(logdj, order = c(p, 0, q), method = "ML")
      results <- rbind(results, data.frame(
        p = p,
        q = q,
        AIC = AIC(fit),
        BIC = BIC(fit)
      ))
    }, silent = TRUE)
  }
}

# In bảng kết quả sắp xếp theo AIC
results[order(results$AIC), ]

# Tạo biến ngoại sinh cho GARCH
Xreg <- dowjones %>%
  filter(Date %in% index(logdj)) %>%
  select(GPR, Inflation, DFF) %>%
  as.matrix()

# Fit best EGARCH model
options(scipen = 999)
best_GARCHspec <- ugarchspec(variance.model = list(model = "eGARCH", garchOrder = c(1, 1), external.regressors = Xreg),
  mean.model = list(armaOrder = c(2, 2), include.mean =FALSE), 
                    distribution.model = "norm")
best_GARCH <- ugarchfit(spec = best_GARCHspec, data = logdj, solver = 'hybrid')
print(best_GARCH)


# DỰ BÁO 

# Dự báo nhiều bước (multi-step ahead) không rolling
forecast_GARCH <- ugarchforecast(best_GARCH, n.ahead = 30)
plot(forecast_GARCH)  # Hiển thị menu plot, chọn các loại plot không rolling

# Lấy dữ liệu dự báo mean và sigma 
mean_forecast <- as.numeric(fitted(forecast_GARCH))
sigma_forecast <- as.numeric(sigma(forecast_GARCH))

# In ra một số giá trị dự báo
head(data.frame(mean_forecast, sigma_forecast), 30)


# Dự báo rolling (one-step ahead rolling forecast)
roll_forecast <- ugarchroll(
  spec = best_GARCHspec,
  data = logdj,
  n.ahead = 1,               # Bắt buộc = 1 trong rolling
  forecast.length = 100,     # Số điểm dự báo rolling
  n.start = length(logdj) - 100,
  refit.every = 20,
  refit.window = "moving"
)

# Vẽ plot rolling forecast, plot số 2 (Time Series Prediction (rolling))
plot(roll_forecast, which = 2)

# Dự báo rolling (one-step ahead rolling forecast)
roll_forecast <- ugarchroll(
  spec = best_GARCHspec,
  data = logdj,
  n.ahead = 1,               # rolling forecast 1 bước
  forecast.length = 100,     # số điểm dự báo rolling
  n.start = length(logdj) - 100,
  refit.every = 20,
  refit.window = "moving"
)

# Vẽ Sigma Prediction (rolling)
plot(roll_forecast, which = 4)







