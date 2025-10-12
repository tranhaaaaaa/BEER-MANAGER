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

    public virtual DbSet<OrderItem> OrderItems { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<Shop> Shops { get; set; }

    public virtual DbSet<Table> Tables { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("server=DESKTOP-TPS0JEE\\SQLEXPRESS;database=ECommerceDB;user=sa;password=123;TrustServerCertificate=true;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Logging>(entity =>
        {
            entity.HasKey(e => e.LogUid).HasName("PK__Logging__D12CCB367042FDA1");

            entity.ToTable("Logging");

            entity.Property(e => e.LogUid)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("LogUID");
            entity.Property(e => e.Action).HasMaxLength(100);
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Level).HasMaxLength(100);
            entity.Property(e => e.RecordUid).HasColumnName("RecordUID");
            entity.Property(e => e.TableName).HasMaxLength(100);
            entity.Property(e => e.UserUid).HasColumnName("UserUID");

            entity.HasOne(d => d.UserU).WithMany(p => p.Loggings)
                .HasForeignKey(d => d.UserUid)
                .HasConstraintName("FK__Logging__UserUID__71D1E811");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.OrderUid).HasName("PK__Order__EF45ED22EF65FC3F");

            entity.ToTable("Order");

            entity.Property(e => e.OrderUid)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("OrderUID");
            entity.Property(e => e.Name).HasMaxLength(1);
            entity.Property(e => e.OrderDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.ShopUid).HasColumnName("ShopUID");
            entity.Property(e => e.TotalAmount)
                .HasDefaultValue(0m)
                .HasColumnType("decimal(18, 2)");
            entity.Property(e => e.Type).HasMaxLength(1);
            entity.Property(e => e.UserUid).HasColumnName("UserUID");

            entity.HasOne(d => d.ShopU).WithMany(p => p.Orders)
                .HasForeignKey(d => d.ShopUid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Order__ShopUID__656C112C");

            entity.HasOne(d => d.UserU).WithMany(p => p.Orders)
                .HasForeignKey(d => d.UserUid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Order__UserUID__66603565");
        });

        modelBuilder.Entity<OrderItem>(entity =>
        {
            entity.HasKey(e => e.OrderItemUid).HasName("PK__OrderIte__7A70AEA3A156B1BD");

            entity.ToTable("OrderItem");

            entity.Property(e => e.OrderItemUid)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("OrderItemUID");
            entity.Property(e => e.Name).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.OrderUid).HasColumnName("OrderUID");
            entity.Property(e => e.ProductUid).HasColumnName("ProductUID");
            entity.Property(e => e.UnitPrice).HasColumnType("decimal(18, 2)");

            entity.HasOne(d => d.OrderU).WithMany(p => p.OrderItems)
                .HasForeignKey(d => d.OrderUid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__OrderItem__Order__6A30C649");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.ProductUid).HasName("PK__Product__ADC6EB5B72584E7C");

            entity.ToTable("Product");

            entity.Property(e => e.ProductUid)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("ProductUID");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Description).HasMaxLength(500);
            entity.Property(e => e.Img)
                .HasMaxLength(1000)
                .IsFixedLength();
            entity.Property(e => e.Price).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.PriceConfig).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.ProductName).HasMaxLength(150);
            entity.Property(e => e.ShopUid).HasColumnName("ShopUID");
            entity.Property(e => e.Stock).HasDefaultValue(0);
            entity.Property(e => e.Type).HasDefaultValue(0);

            entity.HasOne(d => d.ShopU).WithMany(p => p.Products)
                .HasForeignKey(d => d.ShopUid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Product__ShopUID__5FB337D6");
        });

        modelBuilder.Entity<Shop>(entity =>
        {
            entity.HasKey(e => e.ShopUid).HasName("PK__Shop__5DD995CC9AA24EB6");

            entity.ToTable("Shop");

            entity.Property(e => e.ShopUid)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("ShopUID");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Img).HasMaxLength(2000);
            entity.Property(e => e.Password).HasMaxLength(2000);
            entity.Property(e => e.ShopName).HasMaxLength(150);
            entity.Property(e => e.Username).HasMaxLength(200);
        });

        modelBuilder.Entity<Table>(entity =>
        {
            entity.HasKey(e => e.TableId).HasName("PK__Table__7D5F018E3756B032");

            entity.ToTable("Table");

            entity.Property(e => e.TableId)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("TableID");
            entity.Property(e => e.Name).HasMaxLength(200);
            entity.Property(e => e.OrderId).HasColumnName("OrderID");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Uid).HasName("PK__User__C5B1960282B28074");

            entity.ToTable("User");

            entity.Property(e => e.Uid)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("UID");
            entity.Property(e => e.Address).HasMaxLength(2000);
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Name).HasMaxLength(100);
            entity.Property(e => e.Phone).HasMaxLength(20);
            entity.Property(e => e.ShopUid).HasColumnName("ShopUID");

            entity.HasOne(d => d.ShopU).WithMany(p => p.Users)
                .HasForeignKey(d => d.ShopUid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__User__ShopUID__534D60F1");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
