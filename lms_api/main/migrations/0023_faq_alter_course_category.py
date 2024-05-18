# Generated by Django 5.0.6 on 2024-05-17 17:03

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0022_course_course_views'),
    ]

    operations = [
        migrations.CreateModel(
            name='FAQ',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.CharField(max_length=300)),
                ('answer', models.TextField(null=True)),
            ],
            options={
                'verbose_name_plural': '16. FAQ',
            },
        ),
        migrations.AlterField(
            model_name='course',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='category_courses', to='main.coursecategory'),
        ),
    ]
