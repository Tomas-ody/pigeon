package sk.kasv.app.dto;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import sk.kasv.app.entity.Pigeon;
import sk.kasv.app.entity.User;

import java.util.List;

public class ConverterToJson {

    public static JSONObject createPigeonJson(Pigeon pigeon) {

        JSONObject jsonObject = new JSONObject();

        jsonObject.put("id", pigeon.getId());
        jsonObject.put("name", pigeon.getName());
        jsonObject.put("color", pigeon.getColor());
        jsonObject.put("breed", pigeon.getBreed());
        jsonObject.put("ownerId", pigeon.getOwnerId());

        return jsonObject;
    }

    public static JSONObject createUserJson(User user) {

        JSONObject jsonObject = new JSONObject();

        jsonObject.put("id", user.getId());
        jsonObject.put("username", user.getUsername());
        jsonObject.put("password", user.getPassword());

        return jsonObject;
    }

    public static JSONArray createListOfPigeons(List<Pigeon> list) {

        JSONArray jsonArray = new JSONArray();

        for (Pigeon pigeon : list) {
            jsonArray.add(createPigeonJson(pigeon));
        }

        return jsonArray;
    }

    public static JSONArray createListOfUsers(List<User> list) {

        JSONArray jsonArray = new JSONArray();

        for (User user : list) {
            jsonArray.add(createUserJson(user));
        }

        return jsonArray;
    }

    public static JSONObject createSingleJson(String token) {
        return (JSONObject) new JSONObject().put("token", token);
    }

    public static JSONObject jsonMessage(String message) {
        return (JSONObject) new JSONObject().put("message", message);
    }
}
