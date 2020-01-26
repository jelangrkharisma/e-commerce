## **VERIFY TOKEN**
**URL**: /verifytoken

**METHOD**: POST

**PARAMETERS** (Body) :

**PARAMETERS** (Headers) :
|parameters|data type|constraint
|--|--|--|
|access_token|string

**RESPONSE**:
|Type |Code| data type | attributes:
|--|--|--|--|
|success|201,<br>Created|Obj|_id<br>name<br>email
|fail|400,<br>Bad Request|Obj|msg: [ ]

---
---
## **SIGNUP**
**URL**: /signup

**METHOD**: POST

**PARAMETERS** (Body) :
|parameters|data type|constraint
|--|--|--|
|name|string| length not more than 50 characters
|email|string| valid email format
|password|string| minimal 4 character
|passwordConfirm|string| should match password field

**PARAMETERS** (Headers) :

**RESPONSE**:
|Type |Code| data type | attributes:
|--|--|--|--|
|success|201,<br>Created|Obj|_id<br>name<br>email
|fail|400,<br>Bad Request|Obj|msg: [ ]

---
---
## **SIGN IN**
**URL**: /signin

**METHOD**: POST

**PARAMETERS** (Body):
|parameters|data type
|--|--|
|email|string
|password|string

**PARAMETERS** (Headers) : None

**RESPONSE**:
|Type |Code| data type | attributes:
|--|--|--|--|
|success|200,<br>OK|Obj|access_token
|fail|403,<br>Bad Request|Obj|msg: < string >

---
---
## **FETCH USER INFO**
**URL** : /fetchuserinfo

**METHOD** : GET

**PARAMETERS** (Body) : None

**PARAMETERS** (Headers):
|key|value|type|
|--|--|--|
| access_token | access_token | < string >|

**RESPONSE**:
|Type |Code| data type | attributes:
|--|--|--|--|
|success|200,<br>OK|Array of productId|
|fail|403,<br>Bad Request|Obj|msg: < string >

---
---
## **ADD TO CART**
**URL**: /carts

**METHOD**: POST

**PARAMETERS** (Body):
|parameters|data type|constraint
|--|--|--|
|productId|ObjectId|selected objectId

**PARAMETERS** (Headers):
|key|value|
|--|--|
|access_token|loggedon user access_token|


**RESPONSE**:
|Type |Code| data type | attributes:
|--|--|--|--|
|success|200,<br>Created|Array of ObjectId<br>(product's id)| _id<br>name<br>quantity
|fail|400,<br>Bad Request|Obj|msg

---
---
## **CHECKOUT**
**URL**: /users/checkout

**METHOD**: PATCH

**PARAMETERS** (Body):
|parameters|data type|constraint
|--|--|--|
|cart|array| array of productId and it's quantity<br>[ { _id:id1, quantity: 0},<br>{ _id:id1, quantity: 0} ]


**PARAMETERS** (Headers):
|key|value|
|--|--|
|access_token|loggedon user access_token|

**RESPONSE**:
|Type |Code| data type | attributes:
|--|--|--|--|
|success|200,<br>OK|Obj|msg: 'Checkout Success'
|fail|400,<br>Bad Request|Obj|msg
