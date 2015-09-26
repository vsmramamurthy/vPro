package com.verizon.utils;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Date;
import java.util.Properties;

public class UtilsFactory {
	
	
	
	
	public static Properties getPropertiesFile(String configFilePath)throws Exception{
		Properties prop = null;
		try{
			prop = new Properties();
			InputStream is = new FileInputStream( configFilePath );
			prop.load(is);
		}catch(Exception e){
			System.out.println("Exception in Property file load: "+e.getMessage());
			e.printStackTrace();
			throw e;
		}
		return prop;
	}
	
	
	public static String addTimeURLParam(){
		return "_dc="+(new Date()).getTime();
	}
	public static String replaceNull(Object val1, String val2) {
		if (val1 == null || val1.toString().length() == 0)
			return val2;
		else
			return val1.toString();
	}
}
