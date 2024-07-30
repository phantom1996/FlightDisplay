@Service
public class FlightServiceImpl implements FlightService {
  
  private final MongoClient mongoClient;
  private final MongoDatabase database;
  private static final databaseName = "Flight";
  
  public FlightServiceImpl(@Value("${mongodb.uri}") String mongoUri) {
    mongoClient = new MongoClient(new MongoClientURI(mongoUri));
    database = mongoClient.getDatabase(databaseName);
  }
  
  @Override
  public List<Flight> getAllFlights() {
    MongoCollection<Document> collection = database.getCollection("flights");
    FindIterable<Document> documents = collection.find();
    List<Flight> flights = new ArrayList<>();
    
    for (Document document : documents) {
      Flight flight = new Flight(
        document.getString("flightNo"),
        document.getDate("departureTime"),
        document.getDate("arrivalTime"),
        document.getString("gateNo"),
        document.getString("status")
      );
      flights.add(flight);
    }
    
    return flights;
  }
}