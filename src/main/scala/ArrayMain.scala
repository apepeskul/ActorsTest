import arrays.{ArrayTest, Numbers}

object ArrayMain extends App
{
  override def main(args: Array[String]) =
  {
    val testArray = new ArrayTest(Array(
      Numbers(Array(1, 2, 3, 5, 4, 5)),
      Numbers(Array(2, 2, 4, 5, 4, 5)),
      Numbers(Array(3, 2, 3, 6, 4, 5)),
      Numbers(Array(1, 2, 2, 1, 16, 5)),
      Numbers(Array(1, 2,23, 5, 4, 5)),
      Numbers(Array(1, 42, 3, 3, 3, 3)),
      Numbers(Array(1, 2, 2, 2, 2, 2))
    ))
    testArray.compute(3).map{x => x.foreach{int => print(int + " ")}; print("\n")}
  }
}
