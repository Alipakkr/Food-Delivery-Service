# Food Delivery Service Backend Documentation
## Problem Statement:

The task is to create backend for a Food Delivery app that allows users to order food from their favourite restaurants.
<br>
deployed backend : [Live Link](https://food-delivery-service-qujl.onrender.com)
<br>

 ## Tech Stack

- **JavaScript**
- **Node.js**
- **Express**
- **MongoDB**

 ## Api end which we created for this backend

this is documentation for API ends [Live Link](https://documenter.getpostman.com/view/31971527/2sA358dR27)

## Register User

**POST /api/register**

This endpoint is used to register a new user.

## Login User

**POST /api/login**

This endpoint is used to log in users.

## Reset User Password

PUT /api/user/:id/reset

This endpoint allows the user to reset their password.

## Add Restaurant

**POST /api/restaurants**

This endpoint allows you to add a new restaurant.

## Retrieve Restaurants

**GET /api/restaurants**

This endpoint retrieves a list of restaurants.

## Retrieve Restaurant by ID

**GET /api/restaurants/:id**

This endpoint retrieves information about a specific restaurant based on the provided ID.

### Query Params
- id: `restaurant_id`

## Retrieve Restaurant Menu

**GET /api/restaurants/:id/menu**
This endpoint retrieves the menu of a specific restaurant.
### Query Params
- id: `restaurant_id`

## Add Menu Item to Restaurant

**POST /api/restaurants/:id/menu**

This endpoint allows you to add a new menu item to a specific restaurant.

## Delete Menu Item from Restaurant

**DELETE /api/restaurants/:id/menu/:menuId**

This endpoint removes a specific menu item from a restaurant.

### Request Params
- id: `restaurant_id`
- itemId: `menu_item_id`

## Add Order

**POST /api/orders**

This endpoint allows you to add a new order.
  
## Retrieve Order

**GET /api/orders/:id**

This endpoint retrieves the details of a specific order with the given order ID.

## Update Order Status

**PUT /api/orders/:id**

This endpoint allows you to update the status of a specific order.

