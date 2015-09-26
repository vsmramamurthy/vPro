<%@ page import="com.verizon.utils.UtilsFactory" %>
<HTML>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<HEAD>
	<base href="<%=basePath%>">
	<script>
		document.location.href = "http://localhost:8080/VerizonBusinessPrj/welcome.html";
	</script>
</HEAD>
<BODY>
</BODY>
</HTML>