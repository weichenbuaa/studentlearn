# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import json
import string

import datetime
from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import time
from waybackground.models import *

# Create your views here.

def index(request):
    return render(request, 'index.html')

#定制流程展示
def process_add(request):
    proList = CustomProcess.objects.filter(status=0).order_by('rank')
    return render(request, 'process.html', {'proList': proList})

@csrf_exempt
def process_addresult(request):
    if request.is_ajax() and request.method == 'POST':
        proList = request.POST.getlist('proList')

        for i in range(len(proList)):
            if(0==i%2):
                #print proList[i]
                # 值是process
                pro = CustomProcess.objects.filter(rank=i/2+1)
                # 查找是否已经存在，
                nowTime = time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time()))
                if (1==len(pro)):
                    CustomProcess.objects.filter(rank=i/2+1).update(step=proList[i],rank=i/2+1,content=proList[i+1],
                                                                         status=0,update_time=nowTime)
                elif(0==len(pro)):
                    create_process = CustomProcess(step=proList[i], rank=i/2+1,content=proList[i+1],
                                                   status=0, create_time=nowTime)
                    create_process.save()
                    # 不存在，添加数据。
            else:
                print proList[i]

    return HttpResponse('{"status":"success"}', content_type='application/json')

@csrf_exempt
def process_show(request):
    # 从数据库中获取已经存在的流程数据，将数据在传递到前端界面
    proList = CustomProcess.objects.filter(status=0).order_by('rank')
    return render(request, 'process_show.html', {'proList': proList})

# 旅游客户信息管理
def customer_add(request):
    return render(request, 'customer_add.html')

# 旅游客户信息管理
def customer_add_result(request):
    name = request.POST['name']
    mobile = request.POST['mobile']
    email = request.POST['email']
    wechat = request.POST['wechat']
    qq = request.POST['qq']
    destination = request.POST['destination']
    start_date = datetime.datetime.strptime(request.POST['start_date'], '%m/%d/%Y').date()
    end_date = datetime.datetime.strptime(request.POST['end_date'], '%m/%d/%Y').date()
    days = request.POST['days']
    partner = request.POST['partner']
    peoples = request.POST['peoples']
    budget = request.POST['budget']
    air_tickets = string.atoi(request.POST['air_tickets'])
    visa = string.atoi(request.POST['visa'])
    context = request.POST['context']
    nowTime = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time()))

    print name
    print mobile
    print email
    print wechat
    print qq
    print destination
    print start_date
    print end_date
    print days
    print partner
    print peoples
    print budget
    print air_tickets
    print visa
    print context

    customer = Customer(name=name, mobile= mobile, email= email, wechat= wechat, qq= qq,
                        destination = destination, start_date = start_date, end_date= end_date,
                        days = days, partner = partner,peoples = peoples, budget = budget,
                        air_tickets = air_tickets, visa = visa, context = context,
                        create_time = nowTime, status= 0)
    customer.save()

    return render(request, 'index.html')