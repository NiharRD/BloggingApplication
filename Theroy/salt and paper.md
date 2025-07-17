Understanding Salt in Password Hashing
Salt is a random string that is added to a password before it undergoes the hashing process. The primary purpose of salting is to add uniqueness to each hashed password, even when two users have identical passwords.

When you hash a password without salt, the same password always produces the same hash due to the deterministic nature of hash functions. For example, if both Alice and Bob choose the password "dontpwnme4", their unsalted hashes would be identical. This creates a significant security vulnerability.

algorithm HashPassword(password):
salt <- generateRandomString()
result <- hash(password + salt)
return (result, salt)

Both the hashed password and the salt are then stored in the database. During password verification, the system retrieves the stored salt, combines it with the provided password, generates a hash, and compares it with the stored hash.
