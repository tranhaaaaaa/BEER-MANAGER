public class CreateTableDTO{
    public string Name { get; set; }
    public List<ProductInfoDTO> ProductInfoDTOs { get; set; }
    
}
public class ProductInfoDTO{
  public Guid id {get ; set;}
  public decimal? name {get ;  set;}
  public decimal? price {get ;  set;}
  public int qty {get ;  set;}
}