# Generated by Django 5.0.6 on 2024-05-15 14:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0010_student_profile_picture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='password',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]