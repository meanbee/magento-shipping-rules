Meanbee Shipping Rules Extension
=====================
Configuring shipping costs in Magento can be a pain. Do you find yourself stressing over spreadsheets, tables and matrices only to find that you can’t quite do what you want? Suddenly there’s custom development work involved and you see the costs start to rise. Meanbee’s Shipping Rules module for Magento allows you to configure shipping in the same way that you would set up promotion rules. Choose conditions from:

- Magento Environment (Store, Website, Is Admin Order?)
- Customer Group
- Cart Totals (Weight, Quantity, Subtotal excluding Tax, etc.)
- Promotion (Free Shipping, Coupon Code, etc.)
- Payment Method
- Date and Time
- Destination (Street Address, State, Country, Postal Code, etc.)
- Product Subselection (Product Category, Attribute, Attribute Set, etc.)
- One of the great things we have found using Meanbee Shipping Rules on our own client sites is that setting up shipping costs becomes so much easier once you can use negation, e.g. If a customer is not from the UK, offer them this price.

#### Examples

Here are some examples of rules:

- If ALL of these conditions are TRUE
 - Customer Group is one of "Not Logged In" or "General"
 - Cart Total less than or equal to 50
 - and Shipping Country is United Kingdom.

- If ALL of these conditions are TRUE:
 - Cart Subtotal (after Discounts) greater than or equal to 149
 - and Customer Group is not one of "VIP Club"

- If ALL of these conditions are TRUE:
 - Customer Group is one of "VIP Club"
 - and If ANY of these conditions are TRUE:
   - Postal Code is of United Kingdom format and matches ALL of these conditions:
     - Part 1 (W1A 3BP) is "FK"
     - and Part 2 (W1A 3BP) is in range [18 - 19]
   - or Postal Code is of United Kingdom format and matches ALL of these conditions:
     - Part 1 (W1A 3BP) is "HS"
     - and Part 2 (W1A 3BP) is in range [1 - 9]

More documentation [can be found here](https://github.com/meanbee/magento-shipping-rules/blob/develop/EXT-ShippingRules-140819-1522.pdf).

##### Compatibility
Compatibility: 1.6, 1.7, 1.8, 1.9

Support
-------
You are welcome to log any issues you find for community support but the functionality is provided *as is* and we will not be providing support. We will however review pull requests if you provide one.

Contribution
------------
Any contribution is highly appreciated. The best way to contribute code is to open a [pull request on GitHub](https://help.github.com/articles/using-pull-requests).


Licence
-------
[OSL - Open Software Licence 3.0](http://opensource.org/licenses/osl-3.0.php)

Copyright
---------
(c) 2017 Meanbee
