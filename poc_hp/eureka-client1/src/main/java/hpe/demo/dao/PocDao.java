package hpe.demo.dao;


import java.util.List;

import net.sf.json.JSONObject;

/**
 * Created by admin on 2017/5/26.
 */
public interface PocDao{
	
    public List<JSONObject> queryTm(String time_id,String phone);
    
    public List<JSONObject> queryTmBase(String tac);
    
    public List<JSONObject> queryTmUser(String time_id,String brand,String model);
    
    public List<JSONObject> queryTmVoiceIndex(String time_id,String brand,String model);
    
    public List<JSONObject> queryTmDataIndex(String time_id,String brand,String model);

}
