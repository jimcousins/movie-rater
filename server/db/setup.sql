DROP TABLE IF EXISTS review;

DROP TABLE IF EXISTS user_table ;




CREATE TABLE review (
    id INT GENERATED ALWAYS AS IDENTITY,
    rating REAL,
    song_name VARCHAR(1000) NOT NULL,
    artist VARCHAR(1000) NOT NULL,
    PRIMARY KEY (id)
);


INSERT INTO review (rating, song_name, artist)
VALUES
  (3.4, 'Never Gonna Give You Up', 'Risk Astley'),
  (5, 'Kathlene', 'Catfish and the bottlemen');
