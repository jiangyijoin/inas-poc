package com.eastcom_sw.poc.dao;

import com.eastcom_sw.frm.core.dao.jpa.DaoImpl;

import net.sf.json.JSONObject;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

/**
 * Created by jiangyi on 2017/5/26.
 */
@Component
public class PocDaoImpl extends DaoImpl implements PocDao{


	@Override
	public List<JSONObject> queryTmVoiceIndex(String time_id,String brand, String model) {
		String sql = "SELECT CSFB_MOCL_SUCCRATE,CSFB_MTCL_SUCCRATE,VL_CONN_SUCCRATE,CALLINGCON_RATE,"
				+ "CALLEDCON_RATE,VL_VC_CALL_DROPRATE,ESRVCCRATE_RATE_CALL,LTE_IN_VL_RATIO,GSM_MOCL_SUCCRATE,"
				+ "GSM_MTCL_SUCCRATE,GSM_DROP_RATE,TD_MOCL_SUCCRATE,TD_MTCL_SUCCRATE,TD_DROP_RATE FROM DM_FT_SE_TA_TM_M "
				+ "WHERE TIME_ID = ? AND TERMINAL_BRAND = ? AND TERMINAL_MODEL = ? AND AREA_ID='0'";
        List<JSONObject> list = jdbcTemplate.query(sql, new Object[]{time_id,brand,model}, new RowMapper<JSONObject>() {
            @Override
            public JSONObject mapRow(ResultSet resultSet, int i) throws SQLException {
            	JSONObject json = new JSONObject();
            	json.accumulate("csfb_mocl_succrate", resultSet.getString(1));
            	json.accumulate("csfb_mtcl_succrate", resultSet.getString(2));
            	json.accumulate("vl_conn_succrate", resultSet.getString(3));
            	json.accumulate("callingcon_rate", resultSet.getString(4));
            	json.accumulate("calledcon_rate", resultSet.getString(5));
            	json.accumulate("vl_vc_call_droprate", resultSet.getString(6));
            	json.accumulate("esrvccrate_rate_call", resultSet.getString(7));
            	json.accumulate("lte_in_vl_ratio", resultSet.getString(8));
            	json.accumulate("gsm_mocl_succrate", resultSet.getString(9));
            	json.accumulate("gsm_mtcl_succrate", resultSet.getString(10));
            	json.accumulate("gsm_drop_rate", resultSet.getString(11));
            	json.accumulate("td_mocl_succrate", resultSet.getString(12));
            	json.accumulate("td_mtcl_succrate", resultSet.getString(13));
            	json.accumulate("td_drop_rate", resultSet.getString(14));
                return json;
            }
        });
        return list;
	}

	@Override
	public List<JSONObject> queryTmDataIndex(String time_id,String brand, String model) {
		String sql = "SELECT LTE_FLOW_RATIO,DNS_SUCCRATE,HTTP_SER_SUCCRATE,TCP_ACK_SUCCRATE FROM DM_FT_SE_TA_TM_M"
				+ " WHERE TIME_ID = ? AND TERMINAL_BRAND = ? AND TERMINAL_MODEL = ? AND AREA_ID='0'";
        List<JSONObject> list = jdbcTemplate.query(sql, new Object[]{time_id,brand,model}, new RowMapper<JSONObject>() {
            @Override
            public JSONObject mapRow(ResultSet resultSet, int i) throws SQLException {
            	JSONObject json = new JSONObject();
            	json.accumulate("lte_flow_ratio", resultSet.getString(1));
            	json.accumulate("dns_succrate", resultSet.getString(2));
            	json.accumulate("http_ser_succrate", resultSet.getString(3));
            	json.accumulate("tcp_ack_succrate", resultSet.getString(4));
                return json;
            }
        });
        return list;
	}

}
