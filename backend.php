<?php
    //Set default time to GMT
    date_default_timezone_set('Asia/Calcutta');
    //This will get the data for the specified days
    $day = file_get_contents("http://chartapi.finance.yahoo.com/instrument/1.0/%5Ensei/chartdata;type=quote;range=5d/json/");

    //Converting days into array format
    $day = explode("finance_charts_json_callback( ", $day);
    $day = explode(")", $day[1]);	
    $day = json_decode(($day[0]),true);

    //This will get the data for the specified months
    $month = file_get_contents("http://chartapi.finance.yahoo.com/instrument/1.0/%5Ensei/chartdata;type=quote;range=1y/json/");
    //Converting months into array format
    $month = explode("finance_charts_json_callback( ", $month);
    $month = explode(")", $month[1]);   
    $month = json_decode(($month[0]),true);

    //Consiist of all the data that need to sent
    $data = array(
    		"company_name" => $day['meta']['Company-Name'], 
    		"Currency" => "INR",
    		"prev_close" => $day['meta']['previous_close'],
    		"min" =>  $day['ranges']['close']['min'],
            "max" =>  $day['ranges']['close']['max'],
            "series" => end($day['series']),
            "five_day" => five_day($day['series']),
            "one_month" => month($month , "1"),
            "five_month" => month($month , "5"),
    	    "one_year" => month($month , "12")
        );
    
    //Return the data in json format
    echo json_encode($data);
    
    //Return data for last five days
    function five_day($json)
    {
        $data = array(
        "label" => "",
        "value" => "" 
        );
        foreach ($json as $value) {
            $data['label'] = $data['label'].date("d M h:i a" , $value['Timestamp'])."|";
            $data['value'] = $data['value'].$value['close']."|";
        }
       
        //Remove the last |
        $data['label'] = trim($data['label'],"|");
        $data['value'] = trim($data['value'],"|");
        
        return $data;
    }
    
    //Return data according to the specified no. of months
    function month($json , $m)
    {
        $data = array(
            "label" => "",
            "value" => "" 
            );
        if(!empty($json))
        {
        
            switch($m)
            {
                case "1": // Gives data for 1 month
                      foreach ($json['series'] as $value) {
                            if(strtotime('today', strtotime("-1 month")) < change_format($value['Date'],"2"))
                            {
                                $data['label'] = $data['label'].change_format($value['Date'],"1")."|";
                                $data['value'] = $data['value'].$value['close']."|";
                            }
                        }  
                break;
                
                case "5":// Gives data for 5 month
                      foreach ($json['series'] as $value) {
                            
                            if(strtotime('today', strtotime("-5 month")) < change_format($value['Date'],"2"))
                            {
                                $data['label'] = $data['label'].change_format($value['Date'],"1")."|";
                                $data['value'] = $data['value'].$value['close']."|";
                            }
                        }  
                break;
                
                case "12":// Gives data for 1 year
                      foreach ($json['series'] as $value) {
                        $data['label'] = $data['label'].change_format($value['Date'],"1")."|";
                        $data['value'] = $data['value'].$value['close']."|";
                        }
                break;
            }
        }
        //Remove the last |
        $data['label'] = trim($data['label'],"|");
        $data['value'] = trim($data['value'],"|"); 

        return $data;                 
    }

    //Return data in the required formzt
    function change_format($d,$format)
    {
        switch($format)
            {
                case "1"://Return in 12 June 2016 format
                        $date=date_create($d);
                        return date_format($date,"d M Y");
                break;
                case "2"://Return in Epoch Time
                        $date=date_create($d);
                        return strtotime(date_format($date,"d M Y"));
                break;
            }
        
    }
?>
