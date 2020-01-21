## **FETCH ALL PRODUCTS** 
**URL** : /products

**METHOD** : GET

**PARAMETERS** (Body) : None

**PARAMETERS** (Headers) : None

**RESPONSE** :
|Type |Code| data type | attributes:
|--|--|--|--|
|success|200,<br>OK|Array of Obj|_id<br>name<br>price<br>stock<br>
|fail|400,<br>Bad Request|Obj|msg

---
---
## **INSERT NEW PRODUCT**
**URL**: /products

**METHOD**: POST

**PARAMETERS** (Body):
|parameters|data type|constraint
|--|--|--|
|name|string|-
|price|integer| positive integers
|stock|integer| positive integers

**PARAMETERS** (Headers):
|key|value|
|--|--|
|access_token|authenticated's user access_token|

**RESPONSE**:
|Type |Code| data type | attributes:
|--|--|--|--|
|success|201,<br>Created|Obj|_id<br>name<br>price<br>stock
|fail|400,<br>Bad Request|Obj|msg

---
---
## **UPDATE PRODUCT**
**URL**: /products

**METHOD**: POST

**PARAMETERS** (Body):
|parameters|data type|constraint
|--|--|--|
|_id|ObjectId|product's ObjectId
|name|string|-
|price|integer|positive integers
|stock|integer|positive integers


**PARAMETERS** (Headers):
|key|value|
|--|--|
|access_token|authenticated's user access_token|

**RESPONSE**:
|Type |Code| data type | attributes:
|--|--|--|--|
|success|200,<br>OK|Obj|msg: 'Product Updated'
|fail|400,<br>Bad Request|Obj|msg

---
## **DELETE PRODUCT**
**URL**: /products

**METHOD**: POST

**PARAMETERS** (Body):
|parameters|data type|constraint
|--|--|--|
|_id|ObjectId|product's ObjectId

**PARAMETERS** (Headers):
|key|value|
|--|--|
|access_token|authenticated's user access_token|

**RESPONSE**:
|Type |Code| data type | attributes:
|--|--|--|--|
|success|200,<br>OK|Obj|msg: 'Product Deleted'
|fail|400,<br>Bad Request|Obj|msg

---
