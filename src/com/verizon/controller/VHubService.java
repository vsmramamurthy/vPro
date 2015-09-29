package com.verizon.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.verizon.bean.Result;

/*import net.sf.json.JSONArray;
import net.sf.json.JSONObject;*/


public class VHubService extends HttpServlet {

	private static final long serialVersionUID = 1L;
	private ServletConfig config;
	public void init(ServletConfig config)
	throws ServletException{
		this.config=config;
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException,IOException{ //method start
		/**
		 * variable declarion 
		 */
		String forward = "";
		
		RequestDispatcher dispatcher = null;
		PrintWriter out = response.getWriter();
        response.setContentType("text/html");

		
		String userName = request.getParameter("verizonPhoneNumber");
		
		List<Result> data = new ArrayList<Result>();
		System.out.println("SSSSSSSSSSSSSSSSSSSSSSSSSS"+userName);
		try {
			Result result =  new Result();
			result.setName("Subway");
			result.setAdress("Subway,1605 Connecticut Ave NW,Washington, DC 20009");
			result.setRating("4.7");
			result.setUrl("wwe.gyhfhfgh");
			result.setMsc("ssssssssssssssss");
			result.setLat("38.911478");
			result.setLon("-77.044155");
			result.setCat("Restaurant");
			data.add(result);
			
			result =  new Result();
			result.setName("ShopHouse Southeast Asian Kitchen");
			result.setAdress("ShopHouse Southeast Asian Kitchen,1516 Connecticut Ave NW,Washington, DC 20036");
			result.setRating("4.0");
			result.setUrl("wwe.gyhfhfgh");
			result.setMsc("ssssssssssssssss");
			result.setLat("38.910721");
			result.setLon("-77.044329");
			result.setCat("Restaurant");
			data.add(result);
			
			result =  new Result();
			result.setName("Darlington House");
			result.setAdress("Darlington House,1610 20th St NW,Washington, DC 20009");
			result.setRating("3.8");
			result.setUrl("wwe.gyhfhfgh");
			result.setMsc("ssssssssssssssss");
			result.setLat("38.911631");
			result.setLon("-77.045212");
			result.setCat("Restaurant");
			data.add(result);
			
			result =  new Result();
			result.setName("Mission Dupont");
			result.setAdress("Mission Dupont,1606 20th St NW,Washington, DC 20009");
			result.setRating("4.5");
			result.setUrl("wwe.gyhfhfgh");
			result.setMsc("ssssssssssssssss");
			result.setLat("38.911482");
			result.setLon("-77.045136");
			result.setCat("Restaurant");
			data.add(result);
			
			result =  new Result();
			result.setName("CIRCA");
			result.setAdress("CIRCA at Dupont,1601 Connecticut Ave NW,Washington, DC 20009");
			result.setRating("4.1");
			result.setUrl("wwe.gyhfhfgh");
			result.setMsc("ssssssssssssssss");
			result.setLat("38.911347");
			result.setLon("-77.04406");
			result.setCat("Restaurant");
			data.add(result);
			
			result =  new Result();
			result.setName("Triple B Fresh");
			result.setAdress("Triple B Fresh,1506 19th St NW,Washington, DC 20036");
			result.setRating("3.6");
			result.setUrl("wwe.gyhfhfgh");
			result.setMsc("ssssssssssssssss");
			result.setLat("38.91066");
			result.setLon("-77.043651");
			result.setCat("Restaurant");
			data.add(result);
			
			result =  new Result();
			result.setName("Beadazzled");
			result.setAdress("Beadazzled,1507 Connecticut Ave NW,Washington, DC 20036");
			result.setRating("3.8");
			result.setUrl("wwe.gyhfhfgh");
			result.setMsc("ssssssssssssssss");
			result.setLat("38.91064");
			result.setLon("-77.043718");
			result.setCat("Shopping");
			data.add(result);
			
			result =  new Result();
			result.setName("Dupont Circle FRESHFARM Marke");
			result.setAdress("Dupont Circle FRESHFARM Market,1500 20th St NW,Washington, DC 20036");
			result.setRating("4.5");
			result.setUrl("wwe.gyhfhfgh");
			result.setMsc("ssssssssssssssss");
			result.setLat("38.910646");
			result.setLon("-77.044654");
			result.setCat("Shopping");
			data.add(result);
			
			result =  new Result();
			result.setName("Loft");
			result.setAdress("Loft,1611 Connecticut Ave NW #4A,Washington, DC 20009");
			result.setRating("4.0");
			result.setUrl("wwe.gyhfhfgh");
			result.setMsc("ssssssssssssssss");
			result.setLat("38.911652");
			result.setLon("-77.044235");
			result.setCat("Shopping");
			data.add(result);
			
			result =  new Result();
			result.setName("ShoppingCart");
			result.setAdress("1630 Connecticut Ave NW,Washington, DC 20009");
			result.setRating("34234234");
			result.setUrl("wwe.gyhfhfgh");
			result.setMsc("ssssssssssssssss");
			result.setLat("38.9120493");
			result.setLon("-77.0452262");
			result.setCat("Shopping");			
			data.add(result);
			
			result =  new Result();
			result.setName("Capital Teas");
			result.setAdress("Capital Teas, Dupont Circle,1627 Connecticut Ave NW,Washington, DC 20009");
			result.setRating("4.0");
			result.setUrl("wwe.gyhfhfgh");
			result.setMsc("ssssssssssssssss");
			result.setLat("38.912012");
			result.setLon("-77.044461");
			result.setCat("Cafe");			
			data.add(result);
			
			result =  new Result();
			result.setName("Starbucks");
			result.setAdress("Starbucks,1700 Connecticut Ave NW,Washington, DC 20009");
			result.setRating("4.7");
			result.setUrl("wwe.gyhfhfgh");
			result.setMsc("ssssssssssssssss");
			result.setLat("38.912767");
			result.setLon("-77.045576");
			result.setCat("Cafe");			
			data.add(result);
			
			result =  new Result();
			result.setName("Teaism Dupont Circle");
			result.setAdress("Teaism Dupont Circle,2009 R St NW,Washington, DC 20009");
			result.setRating("3.9");
			result.setUrl("wwe.gyhfhfgh");
			result.setMsc("ssssssssssssssss");
			result.setLat("38.912772");
			result.setLon("-77.045816");
			result.setCat("Cafe");			
			data.add(result);
			
			result =  new Result();
			result.setName("Kramerbooks & Afterwords Cafe");
			result.setAdress("Kramerbooks & Afterwords Cafe,1517 Connecticut Ave NW,Washington, DC 20036");
			result.setRating("3.1");
			result.setUrl("wwe.gyhfhfgh");
			result.setMsc("ssssssssssssssss");
			result.setLat("38.91079");
			result.setLon("-77.043699");
			result.setCat("Cafe");			
			data.add(result);
			
		}catch(Throwable e){
			
			
		}finally{
			
		}
		
		JSONObject myObj = new JSONObject();
        myObj.put("success", true);
        myObj.put("data", data);
    
        
        out.println(myObj);
        out.close();

		
		
		
	}
	
}
