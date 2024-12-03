package sk.kasv.app.dto;

import org.json.simple.JSONObject;
import sk.kasv.app.entity.Pigeon;

public class ConverterFromJson {

    public static String getString(JSONObject data, String target) {
        return data.get(target).toString();
    }

    public static int getInt(JSONObject data, String target) {
        return (int)data.get(target);
    }
}
