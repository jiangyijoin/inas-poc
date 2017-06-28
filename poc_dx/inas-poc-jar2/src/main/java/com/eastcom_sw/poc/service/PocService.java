package com.eastcom_sw.poc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.eastcom_sw.poc.dao.PocDao;

import net.sf.json.JSONObject;

@Component
public class PocService{
	
    @Autowired
    private PocDao pocDao;

    
    public List<JSONObject> queryTmVoiceIndex(String time_id,String brand,String model){
    	return pocDao.queryTmVoiceIndex(time_id,brand,model);
    }
    
    public List<JSONObject> queryTmDataIndex(String time_id,String brand,String model){
    	return pocDao.queryTmDataIndex(time_id,brand,model);
    }

}
