package arrays

class ArrayTest (initialArray: Array[Numbers])
{
  def compute(n: Int) = initialArray.map
  {
    number =>
      number.frequencyMap.sortBy(_._2).reverse.distinct.map(_._1)take(n)
  }

}

case class Numbers(intArr: Array[Int])
{
  def frequencyMap = for (number <- intArr) yield (number, intArr.count(_ == number))
}
