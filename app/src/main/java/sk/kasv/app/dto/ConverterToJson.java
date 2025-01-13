package sk.kasv.app.dto;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import sk.kasv.app.entity.Pigeon;
import sk.kasv.app.entity.User;
import sk.kasv.app.security.UserDetailsImpl;

import java.util.List;

public class ConverterToJson {

    public static JSONObject createPigeonJson(Pigeon pigeon) {

        JSONObject jsonObject = new JSONObject();

        jsonObject.put("id", pigeon.getId());
        jsonObject.put("fatherId", pigeon.getFatherId());
        jsonObject.put("motherId", pigeon.getMotherId());
        jsonObject.put("kidsId", pigeon.getKidsId());
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

    public static JSONObject createUserJson(UserDetailsImpl user) {

        JSONObject jsonObject = new JSONObject();

        jsonObject.put("username", user.getUsername());
        jsonObject.put("role", user.getAuthority());
        jsonObject.put("email", user.getEmail());
        jsonObject.put("phone", user.getPhone());

        return jsonObject;
    }

    public static JSONObject createListOfPigeons(List<Pigeon> list) {

        JSONArray jsonArray = new JSONArray();
        JSONObject jsonObject = new JSONObject();

        for (Pigeon pigeon : list) {
            jsonArray.add(createPigeonJson(pigeon));
        }

        jsonObject.put("data", jsonArray);

        return jsonObject;
    }

    public static JSONArray createListOfUsers(List<User> list) {

        JSONArray jsonArray = new JSONArray();

        for (User user : list) {
            jsonArray.add(createUserJson(user));
        }

        return jsonArray;
    }

    public static JSONObject createSingleJson(String token) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("token", token);
        return jsonObject;
    }

    public static JSONObject jsonMessage(String message) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("message", message);
        return jsonObject;
    }
}
