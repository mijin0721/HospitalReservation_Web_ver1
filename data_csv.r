# 이 데이터는 공공데이터 건강보험심사평가원_병원정보서비스를 이용하여 데이터프레임을 만들었습니다.
# https://www.data.go.kr/data/15001698/openapi.do

library(RCurl)
library(XML)

api = "https://apis.data.go.kr/B551182/hospInfoServicev2/getHospBasisList"
api_key = ""
numOfRows = 400
pageNo = 1
sidoCd = 320000
sgguCd = 320500



url = paste(api,
            "?serviceKey=", api_key,
            "&pageNo=", pageNo,
            "&numOfRows=", numOfRows,
            "&sidoCd=", sidoCd,
            "&sgguCd=", sgguCd,
            sep="")

url

Data <- getURL(url, .encoding="UTF-8")

xmlFile = xmlParse(Data)
xmlRoot(xmlFile)

df = xmlToDataFrame(getNodeSet(xmlFile, "//items/item"))
str(df)

df2 = data.frame(주소=df$addr,
                 종별=df$clCdNm,
                 엑스=df$XPos,
                 와이=df$YPos,
                 동면리=df$emdongNm,
                 병원명=df$yadmNm)
df2
str(df2)

df2[,3] = as.numeric(df2[,3])
df2[,4] = as.numeric(df2[,4])

write.csv(df2, file="C:/github/data.csv")
