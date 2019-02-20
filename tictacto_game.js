random = function(min, max) {
  if (min==null && max==null)
    return 0;    
  
  if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };
  
check_dup = function(no, list) {
	for(var i=0;i<list.length;i++) {
		if(no == list[i]) {
			return true;
		}
	}
	return false;
};

check_win_pos = function(self_pos, cpu_pos, winning_pos) {
	var self_flag = 0;
	var list_pos = [];
	
	for(var i=0;i<winning_pos.length;i++) {
		for(var j=0;j<winning_pos[i].length;j++) {
			if(winning_pos[i][j] == cpu_pos) {
				list_pos.push(i);
			}
		}
	}
	
	for(i=0;i<list_pos.length;i++) {
		for(j=0;j<winning_pos[list_pos[i]].length;j++) {
			if(winning_pos[list_pos[i]][j] == self_pos) {
				self_flag = 1;
				break;
			}
		}
		
		if(self_flag == 0) {
			return list_pos[i];
		}
		else {
			self_flag = 0;
		}
	}
};

check_win_pos_self = function(pos1,pos2,winning_pos) {
	var list = [];
	for(var i=0;i<winning_pos.length;i++) {
		if(check_dup(pos1,winning_pos[i])) {
			list.push(i);
		}
	}
	
	for(i=0;i<list.length;i++) {
		for(j=0;j<winning_pos[list[i]].length;i++) {
			if(pos2 == winning_pos[list[i]][j]) {
				return list[i];
			}
		}
	}
};
  
  
function playtictacto(pos) {
	var winning_pos = [[0,1,2],[0,4,8],[0,3,6], [1,4,7], [2,5,8], [2,4,6], [3,4,5], [6,7,8]];
	var cnt_turn = 0;
	var self_pos = [];
	var cpu_pos = [];
	var self_turn = 0;
	var cpu_turn = 0;
	var get_pos;
	var game_pos = [];
	var get_winning_pos;
	var get_first_pos_cpu;
	var win_cnt = 1;
	var put_pos = [];
	var k = 0;
	var self_win_pos;
	
	while(cnt_turn < 9) {
		if(cnt_turn == 0) {
			self_pos.push(pos);
			game_pos.push(pos);
			self_turn = 1;
			cnt_turn++;
		}
		else if(cpu_turn == 0 && self_turn == 1) {
				
			//Setting winning position
			if(cnt_turn == 1) {
				do {
					get_first_pos_cpu = random(0,8);
				}while(check_dup(get_first_pos_cpu,game_pos));
				
				cpu_pos.push(get_first_pos_cpu);
				game_pos.push(get_first_pos_cpu);
				get_winning_pos = check_win_pos(pos,get_first_pos_cpu,winning_pos);
				
				if(winning_pos[get_winning_pos][0] != get_first_pos_cpu) {
					put_pos.push(winning_pos[get_winning_pos][0]);
				}
				
				if(winning_pos[get_winning_pos][1] != get_first_pos_cpu) {
					put_pos.push(winning_pos[get_winning_pos][1]);
				}
				
				if(winning_pos[get_winning_pos][2] != get_first_pos_cpu) {
					put_pos.push(winning_pos[get_winning_pos][2]);
				}
				
			}
			else {
				get_pos = put_pos[k];
				k++;
				
				cpu_pos.push(get_pos);
				game_pos.push(get_pos);
				win_cnt++;
			}
			
			cpu_turn = 1;
			self_turn = 0;
			cnt_turn++;
		}
		else if(self_turn == 0 && cpu_turn == 1) {
			var temp_pos = [];
			
			for(var i=0;i<game_pos.length;i++) {
				temp_pos.push(game_pos[i]);
			}
			for(i=0;i<winning_pos[get_winning_pos].length;i++) {
				temp_pos.push(winning_pos[get_winning_pos][i]);
			}
			do {
				var get_pos = random(0,8);
			}while(check_dup(get_pos,temp_pos));
			
			self_turn = 1;
			cpu_turn = 0;
			self_pos.push(get_pos);
			game_pos.push(get_pos);
			cnt_turn++;
		}
		
		if(win_cnt == 3) {
			break;
		}	
	}
	console.log("Self Position : "+self_pos[0]+":"+self_pos[1]+":"+self_pos[2]);
	console.log("CPU's Position : "+cpu_pos[0]+":"+cpu_pos[1]+":"+cpu_pos[2]);
	console.log("CPU WINS..");
}