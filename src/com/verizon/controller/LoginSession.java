package com.verizon.controller;

import java.io.IOException;
import java.net.URLEncoder;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Properties;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.verizon.bean.LoginUser;
import com.verizon.connect.DataBaseMaster;
import com.verizon.utils.UtilsFactory;

public class LoginSession extends HttpServlet {

	private static final long serialVersionUID = 1L;
	private ServletConfig config;
	private String CONFIG_PATH;
	private String CONSTANTS_PATH;
	public void init(ServletConfig config)
	throws ServletException{
		this.config=config;
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException,IOException{ //method start
		/**
		 * variable declarion 
		 */
		String forward = "";
		Connection connection=null;
		ResultSet rs=null;
		Statement st=null;
		RequestDispatcher dispatcher = null;
		response.setContentType("text/html");
		HttpSession session = request.getSession();
		Properties prop = null;
		
		
		
		String userName = request.getParameter("verizonPhoneNumber");
		
		
		StringBuffer loginQry = new StringBuffer();
		loginQry.append("SELECT userid, firstname, middlename, lastname, phonenumber from user WHERE UCASE(phonenumber)=UCASE('").append(userName).append("')");

		System.out.println(loginQry);
		try {
			// Load the database driver
			DataBaseMaster dbMaster = DataBaseMaster.doConnectionSetupIfRequired();
			
			connection=dbMaster.giveConnection();
			st = connection.createStatement();
			try{
				rs= st.executeQuery (loginQry.toString());
				if (rs.next() && !rs.next() && rs.previous() && rs.getString("phonenumber").equalsIgnoreCase(userName)){
					LoginUser lu = new LoginUser();
					
					lu.setStrUserName(rs.getString("userid"));
					lu.setStrFirstName(rs.getString("firstname"));
					lu.setStrMiddleName(rs.getString("middlename"));
					lu.setStrLastName(rs.getString("lastname"));
					lu.setStrPhonenumber(rs.getString("phonenumber"));
					
					session.setAttribute("loginUser",lu);
					
					//prop = UtilsFactory.getPropertiesFile(CONSTANTS_PATH);
					
					forward = "/welcome.html";

				}else{
					session.setAttribute("loginUser",null);
					forward = "view/login.jsp?userName="+userName+"&message="+URLEncoder.encode("Invalid UserID Or Password", "UTF-8");//?error<script>alert('enter the correct username password')</script>";
				}
			}catch(Throwable e){
				System.out.println("Exception in user id&password validation: "+e.getMessage());
				e.printStackTrace();
				forward = "view/login.jsp?userName="+userName+"&message="+URLEncoder.encode(e.getMessage(), "UTF-8");
			}
		}catch(Throwable e){
			System.out.println("Exception in conn creation: "+e.getMessage());
			e.printStackTrace();
			forward = "view/login.jsp?userName="+userName+"&message="+URLEncoder.encode("Unable to connect the server.<BR/>Please contact system administrator", "UTF-8");
		}finally{
			DataBaseMaster.closeResultSet(rs);
			rs = null;
			DataBaseMaster.closeStatement(st);
			st = null;
			DataBaseMaster.closeConnection(connection);
			connection = null;
		}
		System.out.println("index"+forward.indexOf('?'));
		
		if( forward.indexOf('?') > 1 ){
			forward+="&"+UtilsFactory.addTimeURLParam();
		}else{
			forward+="?"+UtilsFactory.addTimeURLParam();
		}
		
		System.out.println("forward "+forward);
		
		request.setAttribute("forwardTo",forward);
		dispatcher = request.getRequestDispatcher( "redirector.jsp?"+UtilsFactory.addTimeURLParam() );
		dispatcher.forward(request,response);
	}
	
}
