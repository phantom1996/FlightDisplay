
@RestController
@RequestMapping("/api/flights")
public class FlightController {
  
  @Autowired
  private FlightService flightService;

  private static final String MONGO_URI = "mongodb://localhost:27017";
  private static final String DATABASE_NAME = "flightDB";
  private static final String COLLECTION_NAME = "flights";

//   private MongoClient mongoClient;
//   private MongoCollection<Document> flightCollection;

//   @PostConstruct
//   public void init() {
//       mongoClient = MongoClients.create(MONGO_URI);
//       MongoDatabase database = mongoClient.getDatabase(DATABASE_NAME);
//       flightCollection = database.getCollection(COLLECTION_NAME);
//   }

  @PreDestroy
  public void cleanup() {
      if (mongoClient != null) {
          mongoClient.close();
      }
  }

  
  @GetMapping
  public List<Flight> getAllFlights() {
    return flightService.getAllFlights();
  }
  @PutMapping("/UpdateFlight")
  public ResponseEntity<Flight> updateFlight(@RequestBody Flight flight) {
  // Connect to MongoDB
  MongoClientURI uri = new MongoClientURI(MONGO_URI);
  MongoClient mongoClient = new MongoClient(uri);
  MongoDatabase database = mongoClient.getDatabase(DATABASE_NAME);
  MongoCollection<Document> collection = database.getCollection(COLLECTION_NAME);
  
  // Update flight details  
  Document existingFlight = flightCollection.find(Filters.eq("flightNo", flight.getFlightNo())).first();

  if (existingFlight != null) {
      // Update the existing flight document
      Document updatedFlight = new Document()
              .append("flightNo", flight.getFlightNo())
              .append("departureTime", flight.getDepartureTime().toString())
              .append("arrivalTime", flight.getArrivalTime().toString())
              .append("gateNo", flight.getGateNo())
              .append("status", flight.getStatus());

      flightCollection.updateOne(Filters.eq("flightNo", flight.getFlightNo()), new Document("$set", updatedFlight));
      mongoClient.close();
      return ResponseEntity.ok("Flight status updated successfully!");
  } else {
      mongoClient.close();
      return ResponseEntity.status(404).body("Flight number not found!");
  }
}
}
}