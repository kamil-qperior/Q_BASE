import  { Connection, Request } from "tedious";

// Create connection to database
export const config = {
    authentication: {
        options: {
            userName: "kamil", // update me
            password: "A4tech44" // update me
        },
        type: "default"
    },
    server: "poc-info.database.windows.net", // update me
    options: {
        database: "poc-db", //update me
        encrypt: true
    }
};

const connection = new Connection(config);
export let result = null;
connection.connect()

// Attempt to connect and execute queries if connection goes through
//since DB is down afte 1h first connections will fail
connection.on("connect", err => {
    if (err) {
        console.error(err.message);
    } else {
        queryDatabase();
    }
});

function queryDatabase() {
    console.log("Reading rows from the Table...");

    // Read all rows from table
    const request = new Request(
        `SELECT * from [dbo].[Slides]`,
        (err, rowCount) => {
            if (err) {
                console.error(err.message);
            } else {
                
                console.log(`${rowCount} row(s) returned`);
            }
        }
    );

    request.on("row", columns => {
        const columnsArray = []
        const valuesArray = []
        columns.forEach(column => {
            result = {
                column: columnsArray.push(column.metadata.colName),
                value:  valuesArray.push(column.value)
            }
            console.log("%s\t%s", column.metadata.colName, column.value);
        });
    });

    connection.execSql(request);
}

connection.close()