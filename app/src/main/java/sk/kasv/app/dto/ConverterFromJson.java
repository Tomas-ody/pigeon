package sk.kasv.app.dto;

import org.json.simple.JSONObject;
import sk.kasv.app.entity.Pigeon;

import java.util.List;

public class ConverterFromJson {

    public static String getString(JSONObject data, String target) {
        return data.get(target).toString();
    }

    public static int getInt(JSONObject data, String target) {
        return (int)data.get(target);
    }

    public static List<Integer> getList(JSONObject data, String target) {
        return (List<Integer>)data.get(target);
    }
}
