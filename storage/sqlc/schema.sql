CREATE TABLE IF NOT EXISTS Client (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    fathersName TEXT NOT NULL,
    title TEXT NOT NULL,
    ipn TEXT NOT NULL,
    address TEXT NOT NULL,
    account TEXT NOT NULL,
    phone TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Document (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    executorId INTEGER NOT NULL,
    contractorId INTEGER NOT NULL ,
    date TEXT NOT NULL,
    title TEXT NOT NULL,
    FOREIGN KEY (executorId) REFERENCES Client(id),
    FOREIGN KEY (contractorId) REFERENCES Client(id)
);

CREATE TABLE IF NOT EXISTS DocTransaction (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    documentId INTEGER NOT NULL,
    amount TEXT NOT NULL,
    FOREIGN KEY (documentId) REFERENCES Document(id)
);
