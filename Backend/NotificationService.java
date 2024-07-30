import com.google.firebase.cloud.messaging.FirebaseCloudMessaging;
import com.google.firebase.cloud.messaging.Message;

public class NotificationService {
  private FirebaseCloudMessaging fcm;

  public NotificationService() {
    fcm = FirebaseCloudMessaging.getInstance();
  }

  public void sendNotification(String flightNo, String updatedData) {
    // Retrieve passenger data from Passenger Database
    MongoCollection<Document> passengerCollection = passengerDatabase.getCollection("passengers");
    FindIterable<Document> passengers = passengerCollection.find(eq("flightNo", flightNo));

    // Generate notification message for each passenger
    for (Document passenger : passengers) {
      String passengerName = passenger.getString("passengerName");
      String mobileNumber = passenger.getString("mobileNumber");
      String notificationMessage = "Flight " + flightNo + " has been updated: " + updatedData;

      // Create FCM message
      Message message = Message.builder()
        .setToken(mobileNumber) // Replace with client device token
        .setNotification(Notification.builder()
          .setTitle("Flight Update")
          .setBody(notificationMessage)
          .build())
        .build();

      // Send FCM message
      fcm.send(message);
    }
  }
}