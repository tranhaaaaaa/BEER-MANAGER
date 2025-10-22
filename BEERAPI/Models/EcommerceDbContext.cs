using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace BEERAPI.Models;

public partial class EcommerceDbContext : DbContext
{
    public EcommerceDbContext()
    {
    }

    public EcommerceDbContext(DbContextOptions<EcommerceDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Logging> Loggings { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<Orderitem> Orderitems { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<Shop> Shops { get; set; }

    public virtual DbSet<Table> Tables { get; set; }

    public virtual DbSet<User> Users { get; set; }


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
       => optionsBuilder.UseNpgsql("Host=ep-blue-leaf-a487163d-pooler.us-east-1.aws.neon.tech;Database=EcommerceDb;Username=neondb_owner;Password=npg_dUAX0g7aZxvJ;SSL Mode=VerifyFull;Trust Server Certificate=true");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasPostgresExtension("pg_session_jwt");

        modelBuilder.Entity<Logging>(entity =>
        {
            entity.HasKey(e => e.Loguid).HasName("logging_pkey");

            entity.ToTable("logging");

            entity.Property(e => e.Loguid)
                .HasDefaultValueSql("gen_random_uuid()")
                .HasColumnName("loguid");
            entity.Property(e => e.Action)
                .HasMaxLength(100)
                .HasColumnName("action");
            entity.Property(e => e.Createdat)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("createdat");
            entity.Property(e => e.Level)
                .HasMaxLength(100)
                .HasColumnName("level");
            entity.Property(e => e.Recorduid).HasColumnName("recorduid");
            entity.Property(e => e.Tablename)
                .HasMaxLength(100)
                .HasColumnName("tablename");
            entity.Property(e => e.Useruid).HasColumnName("useruid");

            entity.HasOne(d => d.Useru).WithMany(p => p.Loggings)
                .HasForeignKey(d => d.Useruid)
                .HasConstraintName("fk_logging_user");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.Orderuid).HasName("Order_pkey");

            entity.ToTable("Order");

            entity.Property(e => e.Orderuid)
                .HasDefaultValueSql("gen_random_uuid()")
                .HasColumnName("orderuid");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
            entity.Property(e => e.Orderdate)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("orderdate");
            entity.Property(e => e.Shopuid).HasColumnName("shopuid");
            entity.Property(e => e.Totalamount)
                .HasPrecision(18, 2)
                .HasDefaultValueSql("0")
                .HasColumnName("totalamount");
            entity.Property(e => e.Type)
                .HasMaxLength(50)
                .HasColumnName("type");
            entity.Property(e => e.Useruid).HasColumnName("useruid");

            entity.HasOne(d => d.Shopu).WithMany(p => p.Orders)
                .HasForeignKey(d => d.Shopuid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_order_shop");

            entity.HasOne(d => d.Useru).WithMany(p => p.Orders)
                .HasForeignKey(d => d.Useruid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_order_user");
        });

        modelBuilder.Entity<Orderitem>(entity =>
        {
            entity.HasKey(e => e.Orderitemuid).HasName("orderitem_pkey");

            entity.ToTable("orderitem");

            entity.Property(e => e.Orderitemuid)
                .HasDefaultValueSql("gen_random_uuid()")
                .HasColumnName("orderitemuid");
            entity.Property(e => e.Name)
                .HasMaxLength(150)
                .HasColumnName("name");
            entity.Property(e => e.Orderuid).HasColumnName("orderuid");
            entity.Property(e => e.Productuid).HasColumnName("productuid");
            entity.Property(e => e.Unitprice)
                .HasPrecision(18, 2)
                .HasColumnName("unitprice");

            entity.HasOne(d => d.Orderu).WithMany(p => p.Orderitems)
                .HasForeignKey(d => d.Orderuid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_orderitem_order");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.Productuid).HasName("product_pkey");

            entity.ToTable("product");

            entity.Property(e => e.Productuid)
                .HasDefaultValueSql("gen_random_uuid()")
                .HasColumnName("productuid");
            entity.Property(e => e.Createdat)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("createdat");
            entity.Property(e => e.Description)
                .HasMaxLength(500)
                .HasColumnName("description");
            entity.Property(e => e.Img)
                .HasMaxLength(1000)
                .HasColumnName("img");
            entity.Property(e => e.Price)
                .HasPrecision(18, 2)
                .HasColumnName("price");
            entity.Property(e => e.Priceconfig)
                .HasPrecision(18, 2)
                .HasColumnName("priceconfig");
            entity.Property(e => e.Productname)
                .HasMaxLength(150)
                .HasColumnName("productname");
            entity.Property(e => e.Shopuid).HasColumnName("shopuid");
            entity.Property(e => e.Stock)
                .HasDefaultValue(0)
                .HasColumnName("stock");
            entity.Property(e => e.Type)
                .HasDefaultValue(0)
                .HasColumnName("type");

            entity.HasOne(d => d.Shopu).WithMany(p => p.Products)
                .HasForeignKey(d => d.Shopuid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_product_shop");
        });

        modelBuilder.Entity<Shop>(entity =>
        {
            entity.HasKey(e => e.Shopuid).HasName("shop_pkey");

            entity.ToTable("shop");

            entity.Property(e => e.Shopuid)
                .HasDefaultValueSql("gen_random_uuid()")
                .HasColumnName("shopuid");
            entity.Property(e => e.Createdat)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("createdat");
            entity.Property(e => e.Img)
                .HasMaxLength(2000)
                .HasColumnName("img");
            entity.Property(e => e.Password)
                .HasMaxLength(2000)
                .HasColumnName("password");
            entity.Property(e => e.Shopname)
                .HasMaxLength(150)
                .HasColumnName("shopname");
            entity.Property(e => e.Username)
                .HasMaxLength(200)
                .HasColumnName("username");
        });

        modelBuilder.Entity<Table>(entity =>
        {
            entity.HasKey(e => e.Tableid).HasName("Table_pkey");

            entity.ToTable("Table");

            entity.Property(e => e.Tableid)
                .HasDefaultValueSql("gen_random_uuid()")
                .HasColumnName("tableid");
            entity.Property(e => e.Name)
                .HasMaxLength(200)
                .HasColumnName("name");
            entity.Property(e => e.Orderid).HasColumnName("orderid");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Uid).HasName("User_pkey");

            entity.ToTable("User");

            entity.Property(e => e.Uid)
                .HasDefaultValueSql("gen_random_uuid()")
                .HasColumnName("uid");
            entity.Property(e => e.Address)
                .HasMaxLength(2000)
                .HasColumnName("address");
            entity.Property(e => e.Createdat)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("createdat");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
            entity.Property(e => e.Phone)
                .HasMaxLength(20)
                .HasColumnName("phone");
            entity.Property(e => e.Shopuid).HasColumnName("shopuid");

            entity.HasOne(d => d.Shopu).WithMany(p => p.Users)
                .HasForeignKey(d => d.Shopuid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_user_shop");
        });

        // modelBuilder.Entity<UsersSync>(entity =>
        // {
        //     entity.HasKey(e => e.Id).HasName("users_sync_pkey");

        //     entity.ToTable("users_sync", "neon_auth");

        //     entity.HasIndex(e => e.DeletedAt, "users_sync_deleted_at_idx");

        //     entity.Property(e => e.Id)
        //         .HasComputedColumnSql("(raw_json ->> 'id'::text)", true)
        //         .HasColumnName("id");
        //     entity.Property(e => e.CreatedAt)
        //         .HasComputedColumnSql("to_timestamp((trunc((((raw_json ->> 'signed_up_at_millis'::text))::bigint)::double precision) / (1000)::double precision))", true)
        //         .HasColumnName("created_at");
        //     entity.Property(e => e.DeletedAt).HasColumnName("deleted_at");
        //     entity.Property(e => e.Email)
        //         .HasComputedColumnSql("(raw_json ->> 'primary_email'::text)", true)
        //         .HasColumnName("email");
        //     entity.Property(e => e.Name)
        //         .HasComputedColumnSql("(raw_json ->> 'display_name'::text)", true)
        //         .HasColumnName("name");
        //     entity.Property(e => e.RawJson)
        //         .HasColumnType("jsonb")
        //         .HasColumnName("raw_json");
        //     entity.Property(e => e.UpdatedAt).HasColumnName("updated_at");
        // });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
