package com.verizon.servlet;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.log4j.Category;

public class InitServlet {
	// set log access
	private static final Category log = Category.getInstance("");
	private static final long serialVersionUID = 1L;
	private static String version = null;
	public static String realPath = null;
	private String CONSTANTS_PATH;
	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public void init() {}
	
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws Exception {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws Exception{
		// TODO Auto-generated method stub
	}

	public static String getVersion() {
		return version;
	}

	public static void setVersion(String version) {
		InitServlet.version = version;
	}
	
	public void loadInitialConstants(){}

	
	
}
