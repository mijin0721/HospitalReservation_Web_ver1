#공공데이터를 전처리하여 json 형식으로 저장

library(jsonlite)
library(RCurl)
library(XML)
library(rjson)

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
df


df[,27] = as.numeric(df[,27])
df[,28] = as.numeric(df[,28])

df1 = data.frame(add = df$addr,
                 type = df$clCdNm,
                 url = df$hospUrl,
                 phone = df$telno,
                 X = df$XPos,
                 Y = df$YPos,
                 name = df$yadmNm)

jsoncars <- toJSON(df1, pretty=T)
prettify(jsoncars)

write(jsoncars, file="export.JSON")

