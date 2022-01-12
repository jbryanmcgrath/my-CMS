INSERT INTO department
    (name)
VALUES
    ('HR'), ('SALES'), ('CUSTOMER SERVICE'), ('MANAGEMENT'), ('TECHNOLOGY');


 INSERT INTO roles
    (title, salary, department_id)
 VALUES
    ('intern_hr', 40000, 1),
    ('senior_hr', 80000, 1),
    ('intern_sales', 30000, 2),
    ('senior_sales', 100000,2),
    ('intern_cs', 20000,3),
    ('senior_cs', 35000,3),
    ('mid_manager', 65000,4),
    ('director_manager', 80000,4),
    ('junior_dev', 60000,5),
    ('senior_dev', 120000,5);
    
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('jane', 'doe', 1 , 7 ),
    ('bob', 'smith', 2,8 ),
    ('jason', 'brown', 3, 7),
    ('gary', 'clark', 4, 8),
    ('darrel', 'mack', 5, 7),
    ('sarah', 'white', 6, 8),
    ('tom', 'red', 7, 8),
    ('harry', 'reid', 8, null),
    ('clark', 'kent', 9, 7),
    ('bryan', 'mick', 10, 8);