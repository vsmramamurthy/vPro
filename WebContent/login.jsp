<%@ page import="com.verizon.utils.UtilsFactory"%>
<%@ page language="java" pageEncoding="UTF-8" session="true"%>
<%@ page import="com.verizon.servlet.InitServlet" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
	<base href="<%=basePath%>">
	<title>CRM - Login</title>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
	<script type="text/javascript" src="extjs/ext-all-debug.js" ></script>
	<script type="text/javascript" src="js/login/app.js"></script>
	
	<link href="extjs/resources/css/ext-all-neptune.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript">
	</script>
</head>
<body></body>
</html>