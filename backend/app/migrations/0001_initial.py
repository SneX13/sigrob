# Generated by Django 4.0.4 on 2022-06-04 23:48

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('email', models.CharField(max_length=255)),
                ('password', models.CharField(max_length=255)),
                ('is_admin', models.BooleanField()),
                ('company',
                 models.ForeignKey(on_delete=django.db.models.deletion.CASCADE,
                                   to='app.company', to_field='name')),
            ],
        ),
        migrations.CreateModel(
            name='System',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('parent', models.IntegerField()),
                ('company',
                 models.ForeignKey(on_delete=django.db.models.deletion.CASCADE,
                                   to='app.company')),
            ],
        ),
        migrations.CreateModel(
            name='Component',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('system',
                 models.OneToOneField(on_delete=django.db.models.deletion.CASCADE,
                                      to='app.system')),
            ],
        ),
    ]
