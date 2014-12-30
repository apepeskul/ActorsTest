package actors

import java.util.logging.Logger
import akka.actor._

object TestDispatcherActor
{
  val system = ActorSystem("MyTestSystem")
  lazy val ref = system.actorOf(Props(new TestActor))
  val processed = scala.collection.mutable.Set[TestMessage]()
}

class TestActor extends Actor {
  val log = Logger.getLogger(this.getClass.getName)

  override def receive =
  {
    case msg @ TestMessage(testStr, testInt) if !TestDispatcherActor.processed.contains(msg) =>
      processMessage(msg)
    case msg:TestMessage => log.warning("Not unique message!")
    case _ => log.warning("Can't handle message! Unknown type")
  }

  private def processMessage(message: TestMessage) =
  {
    TestDispatcherActor.processed.add(message)
    println("Received message with str: " + message.testString + " and int: " + message.testInt)
  }
}

// =====================================

case class TestMessage (testString: String, testInt: Int)

case class UniqueMessage (msg: TestMessage)

case class WrongMessage (wrongString: String, wrongInt: Int)




