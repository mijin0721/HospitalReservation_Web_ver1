import pandas as pd

df = pd.read_csv("C:/Users/kmj84/OneDrive/문서/ex1.csv")

x = df[df['yadmNm'].str.contains('강원대학교병원')]

print(x[['XPos','YPos']])
