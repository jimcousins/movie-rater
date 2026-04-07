DROP TABLE IF EXISTS user_table;

CREATE TABLE user_table (
    id INT GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    security_question_id INT NOT NULL,
    security_question_answer VARCHAR(1000) NOT NULL,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS review;

CREATE TABLE review (
    id INT GENERATED ALWAYS AS IDENTITY,
    rating INT,
    movie_name VARCHAR(1000) NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user_table(id)
);