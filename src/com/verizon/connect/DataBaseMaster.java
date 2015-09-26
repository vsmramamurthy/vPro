package com.verizon.connect;

import java.io.FileInputStream;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Properties;

import org.apache.commons.dbcp.ConnectionFactory;
import org.apache.commons.dbcp.DriverManagerConnectionFactory;
import org.apache.commons.dbcp.PoolableConnectionFactory;
import org.apache.commons.dbcp.PoolingDataSource;
import org.apache.commons.pool.impl.GenericObjectPool;

import com.verizon.connect.DataBaseMaster;

public class DataBaseMaster {

	private static HashMap<String, DataBaseMaster> hmClassPath = new HashMap<String,DataBaseMaster>();

	private String driver = "";
	private String protocal = "";
	private String port = "";
	private String dbHostName = "";
	private String dbName = "";
	private String userName = "";
	private String password = "";
	private int maxActive = 10;
	private int maxWait = 500;
	private boolean autoCommit = false;
	//private boolean connEstb = false;
	
	public Connection con;
    public Statement stmt = null;
    public ResultSet rs = null;
	private GenericObjectPool connectionPool = null;
	private PoolingDataSource dataSource = null;

	// To avoid Object creation from outside.
	private DataBaseMaster(){
		
	}
	
	private void getDetails() throws Exception{
		
		driver		= "com.mysql.jdbc.Driver";
		protocal	= "mysql";
		dbHostName	= "localhost";
		port		= "3306";
		dbName		= "verizonbusiness";
		userName	= "root";
		password	= "sa";
		maxActive	= 100;
		maxWait		= 500;
		autoCommit	= true;
	}

	public static DataBaseMaster doConnectionSetupIfRequired() throws Exception{
		DataBaseMaster dbMan = null;
		dbMan = new DataBaseMaster();
		dbMan.connect();
		return dbMan;
	}
	
    private boolean connect() throws Exception{
        try {
			// Read req connection details from property file
        	getDetails();

			// create connection pool
			connectionPool = new GenericObjectPool(null);
			connectionPool.setMaxActive(maxActive);
			connectionPool.setMaxWait(maxWait);
			
			Class.forName(driver).newInstance();
			
        	String dbURL = "jdbc:"+protocal+"://"+dbHostName+":"+port+"/"+dbName+"?autoReconnect=true";
			String connectURI = dbURL+"&user="+userName+"&password="+password;
			
			System.out.println("connectURI "+connectURI);
			// create Connection factory
			ConnectionFactory connectionFactory = new DriverManagerConnectionFactory(connectURI, null);
			
			// create the PoolableConnectionFactory
			PoolableConnectionFactory poolableConnectionFactory = new PoolableConnectionFactory(
					connectionFactory, connectionPool, null, null, false, true);
			
			// set connection factory
			connectionPool.setFactory(poolableConnectionFactory);
			
			// create pool data source
			dataSource = new PoolingDataSource(connectionPool);
			dataSource.setAccessToUnderlyingConnectionAllowed(true);
	
        } catch (Exception e) {
            System.out.println("This is the Exception in connect db: "+e.getMessage());
            e.printStackTrace();
            throw e;
        }
        return true;
    }

    public Connection giveConnection() {
		Connection con = null;
		try{
			con = dataSource.getConnection();
			con.setAutoCommit(autoCommit);
			// gmt_differance is a connection variable now
			// it will have the MySQL server to GMT difference
			// Eg.: if MySQL server is EDT then gmt_differance will get -4:00:00
			con.createStatement().execute("set @gmt_differance = timediff(now(),convert_tz(now(),@@session.time_zone,'+00:00'))");
		} catch (Exception e) {
			System.out.println("General exception" + e.getMessage());
			e.printStackTrace();
		}
		return con;
    }

	public void printStatus(){
		System.out.println("returning static dataSource: "+connectionPool.getNumIdle()+"<>"+connectionPool.getNumActive());
	}

	public static boolean closeResultSet(ResultSet rst){
		try{
			if(rst != null )
				rst.close();
		}catch(Exception e){
			System.out.println("Exception while closing ResultSet: "+e.getMessage());
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public static boolean closeStatement(Statement sta){
		try{
			if(sta != null )
				sta.close();
		}catch(Exception e){
			System.out.println("Exception while closing Statement: "+e.getMessage());
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public static boolean closeConnection(Connection conn){
		try{
			if(conn != null )
				conn.close();
		}catch(Exception e){
			System.out.println("Exception while closing Connection: "+e.getMessage());
			e.printStackTrace();
			return false;
		}
		return true;
	}
}
