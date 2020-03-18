-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.

select category.categoryName, product.productName
    from product 
    join category on category.Id = product.categoryId;

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.

select [order].id, shipper.companyName
    from shipper 
    join [order] on [order].shipVia = shipper.id
    where [order].orderDate < "2012-08-09";

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.

select p.productName, o.quantity
    from orderDetail as o
    join product as p on p.id = o.productId
    where o.orderID = "10251"
    order by p.ProductName;

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.

Select [order].id, Customer.CompanyName, employee.LastName
from [order]
join customer on customer.id = [order].CustomerId
join employee on employee.id = [order].EmployeeId