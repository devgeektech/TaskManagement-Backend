
import sql from 'mssql'
//connet sql
const  config = {
  user: 'User',
  password: 'root',
  server: 'localhost', 
  database: 'test' ,
  options: {
    trustedConnection: true,
    trustServerCertificate: true
  }
};

// connect to your database
export  const  createSqlConnection=async()=>{
    try{
        sql.connect(config);
    }
    // var request = new sql.Request();
           
    // // query to the database and get the records
    // request.query('select prodcode,prodname from tblprod  ', function (err, recordset) {
        
    //     if (err) console.log(err)

    //     // send records as a response
    //     res.send(recordset);
        
    // });
    catch(err){
        console.log(err);
    }
}