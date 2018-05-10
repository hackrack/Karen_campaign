DROP DATABASE IF EXISTS campaigndb;
CREATE DATABASE campaigndb;

\c campaigndb

CREATE TABLE voters(
  voter_id SERIAL PRIMARY KEY,
  full_name VARCHAR NOT NULL,
  phone_number VARCHAR,
  age VARCHAR,
  address VARCHAR,
  date_last_contacted VARCHAR);

CREATE TABLE volunteers(
  volunteer_id SERIAL PRIMARY KEY,
  voter_id INTEGER REFERENCES voters,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  middle_initial VARCHAR,
  phone_number VARCHAR,
  dob VARCHAR NOT NULL,
  email VARCHAR,
  address VARCHAR,
  interests VARCHAR);

CREATE TABLE youngVolunteers(
  young_volunteer_id SERIAL PRIMARY KEY,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  middle_initial VARCHAR,
  phone_number VARCHAR,
  dob VARCHAR NOT NULL,
  email VARCHAR,
  address VARCHAR,
  interests VARCHAR,
  young_volunteer_timestamp timestamp not null default CURRENT_TIMESTAMP);


INSERT INTO voters(full_name, phone_number, age, address, date_last_contacted)
  VALUES ('George Timothy Clooney', '123-456-7890', '57', '1000 Main street, Wayne, MI, 48150', '2016-09-01'),
  ('Leonardo Di Caprio', '321-654-0987', '52', '123 Broad street, Livonia, MI, 48152', '2016-08-01'),
  ('Demi Moore', '987-012-3456', '54', '321 Braodway, Plymouth, MI, 48154', '2016-09-10'),
  ('Jeniffer Aniston', '567-381-2234', '51', '4321 Wallis street, Northville, MI, 48167', '2012-09-01'),
  ('Matt Paige Damon', '987-654-3210', '51', '54 Main street, Wayne, MI, 48150', '2016-10-01'),
  ('Natalie A. Portman', '321-456-7890', '41', '765 Dales Ave, Livonia, MI, 48152', '2016-09-09'),
  ('Brad Pitt', '231-456-7654', '57', '12 Newton street, Northville, MI, 48167', '2016-09-18'),
  ('Whoopi R. Goldberg', '124-356-8790', '64', '98 JFK blvd, Livonia, MI, 48152', '2012-09-01'),
  ('John Joseph Travolta', '321-123-4567', '59', '789 Hoboken street, Plymouth, MI, 48154', '2016-09-02'),
  ('Stevie J. Wonder', '456-123-9876', '56', '234 Newark street, Northville, MI, 48167', '2016-08-08'),
  ('Tom Jeffrey Hanks', '987-789-1234', '62', '67 Logan ave, Wayne, MI, 48168', '2016-08-24');
