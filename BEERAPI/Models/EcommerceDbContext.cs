using Microsoft.EntityFrameworkCore;

namespace BEERAPI.Models;

public partial class EcommerceDbContext : DbContext
{
    public EcommerceDbContext(DbContextOptions<EcommerceDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<BankTransaction> BankTransactions { get; set; }
    public virtual DbSet<Category> Categories { get; set; }
    public virtual DbSet<Logging> Loggings { get; set; }
    public virtual DbSet<Order> Orders { get; set; }
    public virtual DbSet<OrderItem> OrderItems { get; set; }
    public virtual DbSet<Product> Products { get; set; }
    public virtual DbSet<Shop> Shops { get; set; }
    public virtual DbSet<Table> Tables { get; set; }
    public virtual DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<BankTransaction>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("banktransaction_pkey");

            entity.ToTable("bank_transaction");

            entity.Property(e => e.Id)
                .HasColumnName("id")
                .ValueGeneratedNever(); // nếu muốn auto tăng thì đổi sang UseIdentityByDefaultColumn()

            entity.Property(e => e.AccountNumber)
                .HasColumnName("account_number")
                .HasMaxLength(50);

            entity.Property(e => e.Accumulated)
                .HasColumnName("accumulated")
                .HasColumnType("numeric(18,2)");

            entity.Property(e => e.Content)
                .HasColumnName("content");

            entity.Property(e => e.CreatedAt)
                .HasColumnName("created_at")
                .HasColumnType("timestamp without time zone")
                .HasDefaultValueSql("now()");

            entity.Property(e => e.Description)
                .HasColumnName("description");

            entity.Property(e => e.ExtractedOrderCode)
                .HasColumnName("extracted_order_code")
                .HasMaxLength(100);

            entity.Property(e => e.Gateway)
                .HasColumnName("gateway")
                .HasMaxLength(50);

            entity.Property(e => e.OrderId)
                .HasColumnName("order_id");

            entity.Property(e => e.RawJson)
                .HasColumnName("raw_json");

            entity.Property(e => e.ReferenceCode)
                .HasColumnName("reference_code")
                .HasMaxLength(100);

            entity.Property(e => e.Status)
                .HasColumnName("status")
                .HasDefaultValue(0);

            entity.Property(e => e.SubAccount)
                .HasColumnName("sub_account")
                .HasMaxLength(50);

            entity.Property(e => e.TransactionDate)
                .HasColumnName("transaction_date")
                .HasColumnType("timestamp without time zone");

            entity.Property(e => e.TransferAmount)
                .HasColumnName("transfer_amount")
                .HasColumnType("numeric(18,2)");

            entity.Property(e => e.TransferType)
                .HasColumnName("transfer_type")
                .HasMaxLength(10);
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("category_pkey");

            entity.ToTable("category");

            entity.Property(e => e.Id)
                .HasColumnName("id")
                .HasDefaultValueSql("gen_random_uuid()");

            entity.Property(e => e.Description)
                .HasColumnName("description")
                .HasMaxLength(500);

            entity.Property(e => e.Name)
                .HasColumnName("name")
                .HasMaxLength(255);

            entity.Property(e => e.Type)
                .HasColumnName("type");
        });

        modelBuilder.Entity<Logging>(entity =>
        {
            entity.HasKey(e => e.LogUid).HasName("logging_pkey");

            entity.ToTable("logging");

            entity.Property(e => e.LogUid)
                .HasColumnName("log_uid")
                .HasDefaultValueSql("gen_random_uuid()");

            entity.Property(e => e.Action)
                .HasColumnName("action")
                .HasMaxLength(100);

            entity.Property(e => e.CreatedAt)
                .HasColumnName("created_at")
                .HasColumnType("timestamp without time zone")
                .HasDefaultValueSql("now()");

            entity.Property(e => e.Level)
                .HasColumnName("level")
                .HasMaxLength(100);

            entity.Property(e => e.Message)
                .HasColumnName("message");

            entity.Property(e => e.RecordUid)
                .HasColumnName("record_uid");

            entity.Property(e => e.TableName)
                .HasColumnName("table_name")
                .HasMaxLength(100);

            entity.Property(e => e.UserUid)
                .HasColumnName("user_uid");

            entity.HasOne(d => d.UserU)
                .WithMany(p => p.Loggings)
                .HasForeignKey(d => d.UserUid)
                .HasConstraintName("fk_logging_user_uid");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.OrderUid).HasName("order_pkey");

            entity.ToTable("order");

            entity.Property(e => e.OrderUid)
                .HasColumnName("order_uid")
                .HasDefaultValueSql("gen_random_uuid()");

            entity.Property(e => e.Name)
                .HasColumnName("name")
                .HasMaxLength(255);

            entity.Property(e => e.OrderDate)
                .HasColumnName("order_date")
                .HasColumnType("timestamp without time zone")
                .HasDefaultValueSql("now()");

            entity.Property(e => e.PaymentType)
                .HasColumnName("payment_type");

            entity.Property(e => e.ShopUid)
                .HasColumnName("shop_uid");

            entity.Property(e => e.Status)
                .HasColumnName("status");

            entity.Property(e => e.TotalAmount)
                .HasColumnName("total_amount")
                .HasColumnType("numeric(18,2)")
                .HasDefaultValue(0m);

            entity.Property(e => e.Type)
                .HasColumnName("type");

            entity.Property(e => e.UserUid)
                .HasColumnName("user_uid");

            entity.HasOne(d => d.ShopU)
                .WithMany(p => p.Orders)
                .HasForeignKey(d => d.ShopUid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_order_shop_uid");

            entity.HasOne(d => d.UserU)
                .WithMany(p => p.Orders)
                .HasForeignKey(d => d.UserUid)
                .HasConstraintName("fk_order_user_uid");
        });

        modelBuilder.Entity<OrderItem>(entity =>
        {
            entity.HasKey(e => e.OrderItemUid).HasName("order_item_pkey");

            entity.ToTable("order_item");

            entity.Property(e => e.OrderItemUid)
                .HasColumnName("order_item_uid")
                .HasDefaultValueSql("gen_random_uuid()");

            entity.Property(e => e.Name)
                .HasColumnName("name")
                .HasMaxLength(255);

            entity.Property(e => e.OrderUid)
                .HasColumnName("order_uid");

            entity.Property(e => e.ProductUid)
                .HasColumnName("product_uid");

            entity.Property(e => e.Quantity)
                .HasColumnName("quantity");

            entity.Property(e => e.UnitPrice)
                .HasColumnName("unit_price")
                .HasColumnType("numeric(18,2)");

            entity.HasOne(d => d.OrderU)
                .WithMany(p => p.OrderItems)
                .HasForeignKey(d => d.OrderUid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_order_item_order_uid");

            entity.HasOne(d => d.ProductU)
                .WithMany(p => p.OrderItems)
                .HasForeignKey(d => d.ProductUid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_order_item_product_uid");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.ProductUid).HasName("product_pkey");

            entity.ToTable("product");

            entity.Property(e => e.ProductUid)
                .HasColumnName("product_uid")
                .HasDefaultValueSql("gen_random_uuid()");

            entity.Property(e => e.Category)
                .HasColumnName("category");

            entity.Property(e => e.CreatedAt)
                .HasColumnName("created_at")
                .HasColumnType("timestamp without time zone")
                .HasDefaultValueSql("now()");

            entity.Property(e => e.Description)
                .HasColumnName("description")
                .HasMaxLength(500);

            entity.Property(e => e.Img)
                .HasColumnName("img")
                .HasMaxLength(1000);

            entity.Property(e => e.Price)
                .HasColumnName("price")
                .HasColumnType("numeric(18,2)");

            entity.Property(e => e.PriceConfig)
                .HasColumnName("price_config")
                .HasColumnType("numeric(18,2)");

            entity.Property(e => e.ProductName)
                .HasColumnName("product_name")
                .HasMaxLength(150);

            entity.Property(e => e.ShopUid)
                .HasColumnName("shop_uid");

            entity.Property(e => e.Stock)
                .HasColumnName("stock")
                .HasDefaultValue(0);

            entity.Property(e => e.Type)
                .HasColumnName("type")
                .HasDefaultValue(0);

            entity.HasOne(d => d.ShopU)
                .WithMany(p => p.Products)
                .HasForeignKey(d => d.ShopUid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_product_shop_uid");

            entity.HasOne(d => d.CategoryNavigation)
                .WithMany(p => p.Products)
                .HasForeignKey(d => d.Category)
                .HasConstraintName("fk_product_category");
        });

        modelBuilder.Entity<Shop>(entity =>
        {
            entity.HasKey(e => e.ShopUid).HasName("shop_pkey");

            entity.ToTable("shop");

            entity.Property(e => e.ShopUid)
                .HasColumnName("shop_uid")
                .HasDefaultValueSql("gen_random_uuid()");

            entity.Property(e => e.CreatedAt)
                .HasColumnName("created_at")
                .HasColumnType("timestamp without time zone")
                .HasDefaultValueSql("now()");

            entity.Property(e => e.Img)
                .HasColumnName("img")
                .HasMaxLength(2000);

            entity.Property(e => e.Password)
                .HasColumnName("password")
                .HasMaxLength(2000);

            entity.Property(e => e.ShopName)
                .HasColumnName("shop_name")
                .HasMaxLength(150);

            entity.Property(e => e.Username)
                .HasColumnName("username")
                .HasMaxLength(200);
        });

        modelBuilder.Entity<Table>(entity =>
        {
            entity.HasKey(e => e.TableId).HasName("table_pkey");

            entity.ToTable("table_info"); // tránh đụng từ khóa dễ gây khó chịu

            entity.Property(e => e.TableId)
                .HasColumnName("table_id")
                .HasDefaultValueSql("gen_random_uuid()");

            entity.Property(e => e.Name)
                .HasColumnName("name")
                .HasMaxLength(200);

            entity.Property(e => e.OrderId)
                .HasColumnName("order_id");

            entity.Property(e => e.Status)
                .HasColumnName("status");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Uid).HasName("user_pkey");

            entity.ToTable("user_account"); // tránh "user" là keyword nhạy cảm trong PostgreSQL

            entity.Property(e => e.Uid)
                .HasColumnName("uid")
                .HasDefaultValueSql("gen_random_uuid()");

            entity.Property(e => e.Address)
                .HasColumnName("address")
                .HasMaxLength(2000);

            entity.Property(e => e.CreatedAt)
                .HasColumnName("created_at")
                .HasColumnType("timestamp without time zone")
                .HasDefaultValueSql("now()");

            entity.Property(e => e.Name)
                .HasColumnName("name")
                .HasMaxLength(100);

            entity.Property(e => e.Phone)
                .HasColumnName("phone")
                .HasMaxLength(20);

            entity.Property(e => e.ShopUid)
                .HasColumnName("shop_uid");

            entity.HasOne(d => d.ShopU)
                .WithMany(p => p.Users)
                .HasForeignKey(d => d.ShopUid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_user_shop_uid");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}