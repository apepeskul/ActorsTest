import actors.{WrongMessage, TestMessage, TestDispatcherActor}

object MainClass extends App
{
  override def main(args: Array[String]) =
  {
    val testData = Seq(TestMessage("123", 123),TestMessage("123", 123), WrongMessage("123", 123),
      TestMessage("321", 321), TestMessage("122", 123), TestMessage("123", 113), TestMessage("123", 123), TestMessage("321", 321))
   testData.map {
     msg =>
       TestDispatcherActor.ref ! msg
   }
  }
}
