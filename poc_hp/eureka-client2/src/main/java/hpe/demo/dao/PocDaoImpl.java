package hpe.demo.dao;

import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

/**
 * Created by jiangyi on 2017/5/26.
 */
@Component
public class PocDaoImpl implements PocDao{

	@Autowired
    private JdbcTemplate jdbcTemplate;
	 
	@Override
	public List<JSONObject> queryTm(String time_id, String phone) {
		String sql = "SELECT MSISDN,IMEI,TO_CHAR(UPDATE_DATE,'YYYY-MM'),IMEI_8 FROM TPC_AYN_SWI_USER_IMEI_NEW WHERE  MSISDN= ?";
		List<JSONObject> list = jdbcTemplate.query(sql,new Object[]{phone}, new RowMapper<JSONObject>() {
            @Override
            public JSONObject mapRow(ResultSet resultSet, int i) throws SQLException {
            	JSONObject json = new JSONObject();
            	json.accumulate("msisdn", resultSet.getString(1));
            	json.accumulate("imei", resultSet.getString(2));
            	json.accumulate("update_date", resultSet.getString(3));
            	json.accumulate("tac", resultSet.getString(4));
                return json;
            }
        });
        return list;
	}

	@Override
	public List<JSONObject> queryTmBase(String tac) {
		String sql = "SELECT BRAND,NAME,MODEL,CC_NET,SYSTEM_VERSION,VERSION,TM_NET,VOICE_SOLUTION,"
				+ "CP_MODEL,CP_BRAND,CA,HD_VOICE,CCSUPORT_SYS,SV FROM DW_DM_LT_TERMINAL WHERE TAC = ?";
        List<JSONObject> list = jdbcTemplate.query(sql, new Object[]{tac}, new RowMapper<JSONObject>() {
            @Override
            public JSONObject mapRow(ResultSet resultSet, int i) throws SQLException {
            	JSONObject json = new JSONObject();
            	json.accumulate("terminal_brand", resultSet.getString(1));
            	json.accumulate("name", resultSet.getString(2));
            	json.accumulate("terminal_model", resultSet.getString(3));
            	json.accumulate("cc_net", resultSet.getString(4));
            	json.accumulate("system_version", resultSet.getString(5));
            	json.accumulate("latest_version", resultSet.getString(6));
            	json.accumulate("tm_net", resultSet.getString(7));
            	json.accumulate("voice_solution", resultSet.getString(8));
            	json.accumulate("cp_model", resultSet.getString(9));
            	json.accumulate("cp_brand", resultSet.getString(10));
            	json.accumulate("ca", resultSet.getString(11));
            	json.accumulate("hd_video", resultSet.getString(12));
            	json.accumulate("terminal_net", resultSet.getString(13));
            	json.accumulate("major_version", resultSet.getString(14));
                return json;
            }
        });
        return list;
	}

	@Override
	public List<JSONObject> queryTmUser(String time_id, String brand, String model) {
		String sql = "SELECT * FROM DM_FT_SE_USER_TM_M WHERE TIME_ID = ? AND TERMINAL_BRAND = ? AND TERMINAL_MODEL = ? AND AREA_ID='571'";
        List<JSONObject> list = jdbcTemplate.query(sql, new Object[]{time_id,brand,model}, new RowMapper<JSONObject>() {
            @Override
            public JSONObject mapRow(ResultSet resultSet, int i) throws SQLException {
            	JSONObject json = new JSONObject();
            	json.accumulate("time_id", resultSet.getString(1));
            	json.accumulate("area_id", resultSet.getString(2));
            	json.accumulate("terminal_brand", resultSet.getString(3));
            	json.accumulate("terminal_model", resultSet.getString(4));
            	json.accumulate("terminal_net", resultSet.getString(5));
            	json.accumulate("terminal_type", resultSet.getString(6));
            	json.accumulate("terminal_chip", resultSet.getString(7));
            	json.accumulate("name1", resultSet.getString(8));
            	json.accumulate("usercnt", resultSet.getString(9));
            	json.accumulate("usercnt_add", resultSet.getString(10));
            	json.accumulate("usercnt_ds", resultSet.getString(11));
            	json.accumulate("usercnt_in_4g", resultSet.getString(12));
            	json.accumulate("usercnt_in_volte", resultSet.getString(13));
            	json.accumulate("usercnt_suport_volte", resultSet.getString(14));
            	json.accumulate("usercnt_add_suport_volte", resultSet.getString(15));
            	json.accumulate("terminal_id", resultSet.getString(16));
                return json;
            }
        });
        return list;
	}

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
