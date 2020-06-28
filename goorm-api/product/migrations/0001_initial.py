# Generated by Django 3.0.7 on 2020-06-28 12:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Brand',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Tobacco',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('price', models.IntegerField(blank=True)),
                ('nicotine', models.FloatField()),
                ('tar', models.FloatField()),
                ('throat_hit', models.CharField(max_length=10)),
                ('is_menthol', models.BooleanField(default=False)),
                ('brand', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tobacco', to='product.Brand')),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pub_date', models.DateTimeField(auto_now_add=True)),
                ('contents', models.TextField()),
                ('score', models.PositiveIntegerField(default=3)),
                ('tobacco', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reviews', to='product.Tobacco')),
            ],
        ),
    ]
