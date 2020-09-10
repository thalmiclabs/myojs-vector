/**
 * Copyright 2015 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function(){
	Myo.plugins = Myo.plugins || {};

	Myo.plugins.vector = true;

	var Angles = {
		roll : function(q){
			return Math.atan2(2.0*(q.y*q.z + q.w*q.x), q.w*q.w - q.x*q.x - q.y*q.y + q.z*q.z);
		},
		pitch : function(q){
			return Math.asin(-2.0*(q.x*q.z - q.w*q.y));
		},
		yaw : function(q){
			return Math.atan2(2.0*(q.x*q.y + q.w*q.z), q.w*q.w + q.x*q.x - q.y*q.y - q.z*q.z);
		}
	};

	Myo.on('orientation', function(quanternion){
		var horizontalComponent = Math.sin(Angles.yaw(quanternion)) * Math.cos(Angles.pitch(quanternion));
		var verticalComponent   = Math.sin(Angles.pitch(quanternion));

		var rawTheta = Angles.roll(this.orientationOffset)
		this.trigger('vector', {
			x     : Math.sin(rawTheta) * verticalComponent - Math.cos(rawTheta) * horizontalComponent,
			y     : Math.cos(rawTheta) * verticalComponent + Math.sin(rawTheta) * horizontalComponent,
			theta : Math.sin(Angles.roll(quanternion))
		});
	});
}());


