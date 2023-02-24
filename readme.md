# 簡易前後端上傳圖片

### 此為自製前後端上傳照片練習demo 當作筆記使用
 ***
|    |   |
| :----- | :----- |
| 前端 | vue |
| 後端 | Node express |
| 資料庫 | Firebase Databas |
| 媒體存放 | Firebase Storage |
| | |

## 邏輯:
1.前端post將「圖片檔案」傳至後端處理上傳圖片的API<br>
2.後端req.files接到「檔案」上傳Storage，並取得網址<br>
3.將網址透過res回傳給前端<br>
4.前端繼續填其他資料<br>
5.前端將資料&剛剛上傳圖片拿到的網址post到後端存資料的API<br>
6.後端將資料存入Firestore Database<br>
7.如果前端按取消 則執行delete刪除上傳圖片的API

