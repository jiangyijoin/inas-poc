package hpe.demo.server;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import hpe.demo.dao.PocDao;
import net.sf.json.JSONObject;

@Component
public class PocService{
	
    @Autowired
    private PocDao pocDao;

    public List<JSONObject> queryTm(String time_id, String phone){
        return pocDao.queryTm(time_id, phone);
    }
    
    public List<JSONObject> queryTmBase(String tac){
    	return pocDao.queryTmBase(tac);
    }
    
    public List<JSONObject> queryTmUser(String time_id,String brand,String model){
    	return pocDao.queryTmUser(time_id,brand,model);
    }
    
    public List<JSONObject> queryTmVoiceIndex(String time_id,String brand,String model){
    	return pocDao.queryTmVoiceIndex(time_id,brand,model);
    }
    
    public List<JSONObject> queryTmDataIndex(String time_id,String brand,String model){
    	return pocDao.queryTmDataIndex(time_id,brand,model);
    }


}
